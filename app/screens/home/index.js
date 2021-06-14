import React, { useEffect, useState, useRef, createRef, useContext } from "react";
import { EdoutContext } from '../../context/index'
import flagImg from '../../assets/images/eventmarker.png';
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import * as style from './style'
import * as commonStyle from '../../includes/main-style';
import { GetAllLocations, AddNewLocation } from '../../services'
import { GetSession } from '../../includes/common-functions'
import ActionSheet from "react-native-actions-sheet";
import Button from '../../components/Button/customButton.js'
const actionSheetRef = createRef();
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
let draggable = true
import { StyleSheet, View, Image, FlatList, ScrollView, TouchableOpacity, Text } from "react-native";
import { WarningToast as alert } from '../../includes/common-functions'

const initialRegion = {
	latitude: 23.278610, longitude: 77.363690,
	latitudeDelta: 100,
	longitudeDelta: 100
};


export default function App({ route, navigation }) {
	const mapRef = useRef();
	const [fulllocationData, seFullLocationData] = useState([]);
	const [loadingScreen, setLoadingScreen] = useState(true);
	const [submitDisbaled, changeSubmitDisbaled] = useState(true);
	const [newLocLng, setNewLocLng] = useState(""); //To set lat after new loc marker drag end
	const [newLocLat, setNewLocLat] = useState(""); //To set lng after new loc marker drag end
	const [tag, setTag] = useState("");
	const [place, setPlace] = useState("");
	const [newLoc, setNewLoc] = useState([]); //To drop marker create loc
	const [selectedId, setSelectedId] = useState(null);//garbage
	const { state, dispatch } = useContext(EdoutContext)

	useEffect(() => {
		console.log("home", state.network)
		_getAllLocation() // all 20 location 
	}, [state.network])

	_getAllLocation = async () => {
		const allLocations = await GetAllLocations();
		if (allLocations.success === true) {
			console.log("allLocations=>", allLocations.data.sort((a, b) => (a.tag > b.tag) ? 1 : -1))
			seFullLocationData(allLocations.data.sort((a, b) => (a.tag > b.tag) ? 1 : -1))
			setLoadingScreen(false)
		} else {
			alert(allLocations.message)
			setLoadingScreen(false)
		}

	}
	const animateToRegion = (item, delta = 0.005) => {
		let region = {
			latitude: item.lat,
			longitude: item.lng,
			latitudeDelta: delta,
			longitudeDelta: delta,
		};
		mapRef.current.animateToRegion(region, 2000);
	};
	const Item = ({ item, onPress, style }) => (
		<TouchableOpacity onPress={() => _activityPress(item)} style={[{
			height: 'auto',
			width: commonStyle.getResponsiveScreenWidthDivide(1.5),
			marginVertical: commonStyle.getModerateScale(8),
			marginHorizontal: commonStyle.getModerateScale(8),
			padding: commonStyle.getModerateScale(10),
			borderRadius: commonStyle.getModerateScale(10)
		}, style]}>
			<Text style={{ fontSize: commonStyle.getModerateScale(20), fontWeight: 'bold', color: 'white' }} numberOfLines={2}>Name: {item.tag}</Text>
			<Text style={{ marginTop: commonStyle.getModerateScale(10), fontSize: commonStyle.getModerateScale(14), color: 'white' }} numberOfLines={3}>Location Name: {item.place}</Text>

		</TouchableOpacity>
	);
	const renderItem = ({ item }) => {
		const backgroundColor = item.id === selectedId ? "green" : commonStyle.themeColor();
		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.id)}
				style={[{ backgroundColor }]}
			/>
		);
	};
	_activityPress = (item) => {
		animateToRegion(item)
	}
	_onMarkerPress = (item) => {
		dispatch({ type: "SET_SINGLE_LOCATION", payload: item })
		navigation.navigate("Notes");
	}

	_addNewLoc = () => {
		const item = { lat: mapRef.current.__lastRegion.latitude, lng: mapRef.current.__lastRegion.longitude }

		console.log("_addNewLoc")
		console.log(mapRef.current.__lastRegion)
		setNewLoc([item]);
		// animateToRegion(item, 24)

	}

	function log(eventName, e) {
		console.log(eventName, e.nativeEvent);
		if (eventName == "onPress") {
			console.log(e.nativeEvent.coordinate)
			setNewLocLat(e.nativeEvent.coordinate.latitude)
			setNewLocLng(e.nativeEvent.coordinate.longitude)
			actionSheetRef.current?.show()
		}
	}

	addLocation = () => {
		if (tag.trim().length < 1) {
			alert("Please enter tag");
			return false;
		}
		else if (place.trim().length < 1) {
			alert("Please enter place");
			return false;
		}
		else {
			_fetchApi()
		}
	}

	_fetchApi = async () => {
		const usersession = await GetSession("@LoggedInUserInfo");
		var item = {
			lat: newLocLat,
			lng: newLocLng,
			status: "Proposed",
			tag: tag,
			place: place,
			creator: usersession.email,
			contributor: usersession.socialAuthID,
			date: new Date().toLocaleString(),
		}
		const result = await AddNewLocation(item);
		if (result.success == true) {
			actionSheetRef.current?.hide()
			setPlace('');
			setTag('');
			setNewLocLat('');
			setNewLocLng('');
			seFullLocationData(fulllocationData => [item, ...fulllocationData])
			setNewLoc([])// To delete newly dropped marker
		}
		else {
			alert("Location not added try again")
		}
	}

	_loadScreen = () => {
		return (
			<View style={{
				flex: 1,
				flexDirection: 'column'
			}}>
				<ActionSheet
					ref={actionSheetRef}
					// containerStyle={{ margin: 10, borderRadius: 5 }}
					separateHeight={3}
					separateColor="black"
					backgroundColor="rgba(0, 0, 0, 0.3)"
					containerStyle={{ margin: 10, borderRadius: 5 }}
					gestureEnabled={true}
					closeOnPressBack={true}
				>
					<style.ActionSheetConatiner>
						<style.TimeStampContainer>
						</style.TimeStampContainer>
						<style.FormContainer>
							<style.InputArea>
								<style.InputLebal >Name:</style.InputLebal>
								<style.TextInput placeholder=""
									value={tag}
									onChangeText={text => setTag(text)}
								/>
							</style.InputArea>
							<style.InputAreaPlace>
								<style.InputLebal >Place:</style.InputLebal>
								<style.TextInput
									placeholder=""
									value={place}
									onChangeText={text => setPlace(text)}
								/>
							</style.InputAreaPlace>
							<style.SaveTouchableOpacity onPress={() => addLocation()}>
								<style.SaveText>SAVE</style.SaveText>
							</style.SaveTouchableOpacity>

							{/* <Button onClick={()=>alert(7788)} text={"SAVE"} textColor="white" backgroundColor={commonStyle.themeColor()} disabled={false} />	 */}
						</style.FormContainer>
						{/* <style.ImageContainer> */}


						{/* <style.ImageContainerSmall>
								<style.ImageAndTitle onPress={() => _navigateToEvent()}>
									<style.Image resizeMode='contain' source={require('../../assets/images/addnotes.png')}></style.Image>
									<style.ImageTitle>
										Add Notes
							</style.ImageTitle>
								</style.ImageAndTitle>
								<style.AndText>And</style.AndText>
								<style.ImageAndTitle onPress={() => _navigateToEvent()}>
									<style.ImagePhotos resizeMode='contain' source={require('../../assets/images/addphoto.png')}></style.ImagePhotos>
									<style.ImagePhotoTitle>
										Add Photos
							</style.ImagePhotoTitle>
								</style.ImageAndTitle>
							</style.ImageContainerSmall> */}
						{/* </style.ImageContainer> */}
					</style.ActionSheetConatiner>
				</ActionSheet>
				<View style={{ flex: 1 }}>
					<MapView style={styles.map}
						onRegionChangeComplete={(center) => {
							let northeast = {
								latitude: center.latitude + center.latitudeDelta / 2,
								longitude: center.longitude + center.longitudeDelta / 2,
							}
								, southwest = {
									latitude: center.latitude - center.latitudeDelta / 2,
									longitude: center.longitude - center.longitudeDelta / 2,
								};
							// console.log("onRegionChangeComplete=>",center,"==>", northeast,"==>", southwest);
						}}
						ref={mapRef}
						initialRegion={{
							latitude: fulllocationData.length > 0 ? fulllocationData[0].lat : 0,
							longitude: fulllocationData.length > 0 ? fulllocationData[0].lng : 0,
							latitudeDelta: 100,
							longitudeDelta: 100
						}}
						zoomEnabled={true}
						zoomControlEnabled={true}
						loadingEnabled={true}
						showsMyLocationButton={true}
						showsCompass={true}
						// showsUserLocation={true}
						followUserLocation={true}
						rotateEnabled={false}
						loadingEnabled={true}
					>
						{
							fulllocationData.map((item, index) => {
								return (
									<Marker
										key={index}
										coordinate={{ latitude: item.lat, longitude: item.lng }}
										image={flagImg}
										onPress={() => { _onMarkerPress(item) }}
									>
									</Marker>
								)
							})
						}
						{
							newLoc.map((item, index) => {
								return (
									<Marker
										key={index}
										coordinate={{ latitude: item.lat, longitude: item.lng }}
										// image={flagImg}
										// onPress={() => { _onMarkerPress(item) }}
										draggable={draggable}
										// onSelect={e => console.log('onSelect', e)}
										onDrag={e => log('onDrag', e)}
										onDragStart={e => log('onDragStart', e)}
										onDragEnd={e => log('onDragEnd', e)}
										onPress={e => log('onPress', e)}
									>
									</Marker>
								)
							})
						}
					</MapView>

					<View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between' }}>
						<View style={{
							justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', flexDirection: 'row', marginVertical: 10, marginHorizontal: 10, borderRadius: commonStyle.getModerateScale(20), padding: commonStyle.getModerateScale(9), borderColor: '#9AA1B0', borderWidth: 0.6, shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 2,
							},
							shadowOpacity: 0.25,
							shadowRadius: 3.84,
							elevation: 5,
						}}>
							<TouchableOpacity activeOpacity={.5}>
								<Image source={require('../../assets/images/iconmap.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} />
							</TouchableOpacity>
							<TouchableOpacity style={{ marginLeft: 2, marginRight: 12 }} activeOpacity={.5} onPress={() => navigation.navigate("Events")}>
								{/* <Image source={require('../../assets/images/iconclipboard.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} /> */}
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate('Profile')}>
								<Image source={require('../../assets/images/user.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} />
							</TouchableOpacity>

						</View>
						<View style={{}}>
							{
								newLoc && newLoc.length > 0 ? (
									<TouchableOpacity
										style={{ justifyContent: 'center' }}
										onPress={() => setNewLoc([])}
									>
										<Image source={require('../../assets/images/markerminus.png')} style={{
											width: commonStyle.getModerateScale(100),
											height: commonStyle.getModerateScale(60),
											resizeMode: 'contain', alignSelf: 'center', alignItems: 'center'
										}} />
									</TouchableOpacity>
								) : (
									<TouchableOpacity
										style={{ justifyContent: 'center' }}
										onPress={() => _addNewLoc()}
									>
										<Image source={require('../../assets/images/markerplus.png')} style={{
											width: commonStyle.getModerateScale(100),
											height: commonStyle.getModerateScale(60),
											resizeMode: 'contain', alignSelf: 'center', alignItems: 'center'
										}} />
									</TouchableOpacity>
								)
							}

						</View>
					</View>
				</View>

				<View >
					<ScrollView horizontal={true} >
						<FlatList
							data={fulllocationData}
							renderItem={renderItem}
							keyExtractor={({ lat }) => lat.toString()}
							extraData={selectedId}
							horizontal={true}
						/>
					</ScrollView>
					{/* <Text>{JSON.stringify(coordinates)}</Text> */}
				</View>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			{loadingScreen ? null : (
				_loadScreen()
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	map: {
		...StyleSheet.absoluteFillObject,
	}
});