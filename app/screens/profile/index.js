import React, { useState, useEffect, useContext, createRef } from 'react'
import { EdoutContext } from '../../context/index'
import { WarningToast as alert } from '../../includes/common-functions'
import ActivityIndicator from '../../components/Activity-Indicator';
import { View, Text, Image, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity as RNTouchableOpacity } from "react-native";
import { TouchableOpacity as GestureTouchableOpacity } from "react-native-gesture-handler"
import { ActionSheetContainer, Option, Optiontext, OptionCanceltext, Saperater } from './style';
import * as commonStyle from '../../includes/main-style';
import Header from '../../components/header/profile_header.js'
import Button from '../../components/Button_round/customButton.js'
import { Auth } from 'aws-amplify'
import { getProfile, updateProfile } from '../../services'
// import { ScrollView } from 'react-native-gesture-handler';
import { RNS3 } from 'react-native-aws3';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from "react-native-actions-sheet";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
const actionSheetRef = createRef();
const Profile = ({ routes, navigation }) => {
	const { state, dispatch } = useContext(EdoutContext)
	const [loader, setLoader] = useState(true);
	const [submitDisbaled, changeSubmitDisbaled] = useState(false);
	const [ID, setID] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [country, setCountry] = useState("");
	const [city, setCity] = useState("");
	const [profileImage, setProfileImage] = useState(null);
	const [imagePickResponse, setImagePickResponse] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	let actionSheet;
	
	useEffect(() => {
		_fetchProfile();
		console.log(state.userInformation)
	}, [state.network])

	_fetchProfile = async () => {
		const request = { ID: state.userInformation.attributes.email, socialAuthID: state.userInformation.username }
		const response = await getProfile(request);
		console.log(response)
		if (response.success === true) {
			console.log("response", response, response.data.givenName)
			setID(response.data.ID ? response.data.ID : "")
			setFirstName(response.data.givenName ? response.data.givenName : "")
			setLastName(response.data.familyName ? response.data.familyName : "")
			setCountry(response.data.country ? response.data.country : "")
			setCity(response.data.city ? response.data.city : "")
			setProfileImage(response.data.photo ? "https://edout-learning-user-image.s3.amazonaws.com/" + response.data.photo : null)
			setLoader(false)
		}
		else {
			alert(response.message)
			setLoader(false)
		}
	}
	saveProfile = async () => {
		if (firstName.trim().length < 1) {
			alert("Enter first name")
		}
		else if (lastName.trim().length < 1) {
			alert("Enter last name")
		}
		else if (country.trim().length < 1) {
			alert("Enter country")
		}
		else if (city.trim().length < 1) {
			alert("Enter city")
		}
		else {
			if (imagePickResponse) {
				await uploadFile(imagePickResponse);
				console.log("imagePickResponse=>", imagePickResponse)
			}
			else {
				updateDB()
			}


		}
	}
	go = async () => {
		try {
			await Auth.signOut()
			navigation.navigate("Signup")
		} catch (err) {
			console.log('error signing out...: ', err)
		}
	}
	const _openImagePicker = () => {
		ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo',
        }).then(response => {
            console.log(response)
			actionSheetRef.current?.hide()
			setImagePickResponse(response)
			setProfileImage(response.path)
        })
        .catch(e => {
            console.log("catch", e)
            setLoader(false)
            return
        }).finally(a => {
            setLoader(false)
            console.log('finally', a)
            return
        })
	}

	const _openLibraryPicker = () => {
		ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo',
        }).then(response => {
            console.log(response)
			actionSheetRef.current?.hide()
			setImagePickResponse(response)
			setProfileImage(response.path)
        })
        .catch(e => {
            console.log("catch", e)
            setLoader(false)
            return
        }).finally(a => {
            setLoader(false)
            console.log('finally', a)
            return
        })
	}
	const uploadFile = (response) => {
		changeSubmitDisbaled(true)
		setLoader(true)
		console.log("uploadFile method called", response, imagePickResponse)
		const datetime = new Date().valueOf();
		const imagename = datetime + `_` + state.userInformation.username + '.jpg';
		RNS3.put(
			{
				// `uri` can also be a file system path (i.e. file://)
				uri: imagePickResponse.path,
				name: imagename,
				type: 'image/jpeg',
			},
			{
				keyPrefix: state.userInformation.username + "/", // Ex. myuploads/
				bucket: "edout-learning-user-image", // Ex. aboutreact
				region: 'us-west-2', // Ex. ap-south-1
				accessKey: 'AKIA3MVB6V4R7G5I2BFM',// Ex. AKIH73GS7S7C53M46OQ
				secretKey: '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',// Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
				successActionStatus: 201,
			},
		)
			.progress((progress) => {
				/*setUploadSuccessMessage(`Uploading: ${progress.loaded / progress.total} (${progress.percent}%)`,),*/
				console.log("Uploading", progress)
			})
			.then((response) => {
				console.log(response);
				let { key, etag, location, bucket } = response.body.postResponse;
				if (response.status !== 201) {
					alert('Failed to upload');
					changeSubmitDisbaled(false)
					setLoader(false)
				} else {
					console.log(`Uploaded Successfully: \n1. bucket => ${bucket}\n2. etag => ${etag}\n3. key => ${key}\n4. location => ${location}`)
					changeSubmitDisbaled(false)
					setLoader(false)
					updateDB(key)
				}
			})
	};
	updateDB = async (imagename = "") => {
		changeSubmitDisbaled(true)
		setLoader(true)
		const request = { ID: state.userInformation.attributes.email, socialAuthID: state.userInformation.username, firstName: firstName, lastName: lastName, country: country, city: city, updatedAt: new Date().toLocaleString(), photo: imagePickResponse ? imagename : null }
		console.log("request updateProfile=>", request)
		const response = await updateProfile(request);
		console.log("response updateProfile", response)
		if (response.success === true) {
			alert(response.message)
			setImagePickResponse(null)
		}
		else {
			alert(response.message)
		}
		changeSubmitDisbaled(false)
		setLoader(false)
	}

	return (
		<KeyboardAvoidingView behavior="padding" style={{ flex: 1, backgroundColor: 'white' }}>
			<Header {...navigation} backtext={''} centerTitle='Personal Details' />
			<ScrollView style={{}}>
				{
					(loader)
						?
						(<ActivityIndicator visible={loader} />)
						:
						(null)
				}
				<ActionSheet
					ref={actionSheetRef}
					containerStyle={{ margin: 10, borderRadius: 5 }}
					separateHeight={3}
					separateColor="black"
					backgroundColor="rgba(0, 0, 0, 0.3)"
					containerStyle={{ margin: 10, borderRadius: 5 }}
					gestureEnabled={true}
					closeOnPressBack={true}
				>
					<Option onPress={() => _openImagePicker()}>
						<Optiontext>Take a Photo</Optiontext>
					</Option>
					<Saperater />
					<Option onPress={() => _openLibraryPicker()}>
						<Optiontext>choose from Library</Optiontext>
					</Option>
					<Saperater />
					<Option onPress={() => actionSheetRef.current?.hide()}>
						<OptionCanceltext>Cancel</OptionCanceltext>
					</Option>
				</ActionSheet>

				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					style={{ margin: 0 }}
				>
					<View
						style={{
							height: '50%',
							marginTop: 'auto',
							backgroundColor: 'white',
							borderColor: 'black', borderTopLeftRadius: 30,
							borderTopRightRadius: 30,
							backgroundColor: commonStyle.themeColor(),
							padding: commonStyle.getModerateScale(14),
						}}>

						<GestureTouchableOpacity
							style={{ alignSelf: 'flex-end', padding: 3 }}
							onPress={() => {
								setModalVisible(false);
							}}>
							<Icon name='arrow-circle-o-down' size={22} color='white' style={{ alignSelf: 'flex-end' }} />
						</GestureTouchableOpacity>

							<Text style={{ fontWeight: 'bold', fontSize: commonStyle.getModerateScale(18), color: 'white', alignSelf: 'center', textAlign: 'justify', textDecorationLine: 'underline' }}>Terms and Conditions</Text>

						<ScrollView
							showsVerticalScrollIndicator={false}
							style={{
								marginTop: commonStyle.getModerateScale(10),
								height: '70%',

							}}
						>
							<Text style={{ fontWeight: '600', fontSize: commonStyle.getModerateScale(14), color: 'white', alignSelf: 'center', textAlign: 'justify', marginTop: commonStyle.getModerateScale(12) }} >
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel varius duis porta mauris nam nulla. Sit in urna tempus, sed suscipit natoque. Porttitor ac vitae hac facilisi eu sem posuere velit dui. Fermentum placerat nunc neque mattis non massa dui. Tincidunt porta velit eget et. Interdum dignissim id tristique ut vitae ut viverra. A cras facilisis malesuada erat.
								Sit et gravida ullamcorper elementum platea. Sagittis, tortor ut hac ornare morbi gravida varius. Tristique aliquam urna massa urna nunc, vel feugiat. Curabitur urna, sit sem non mollis sed in phasellus. Nullam nunc pellentesque elit et curabitur scelerisque. Pharetra faucibus ultrices ac at vestibulum lectus eget ultrices consequat. Mauris quisque neque, in non, risus. Sit id hendrerit pharetra eget fermentum, vulputate. Eget bibendum.
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel varius duis porta mauris nam nulla. Sit in urna tempus, sed suscipit natoque. Porttitor ac vitae hac facilisi eu sem posuere velit dui. Fermentum placerat nunc neque mattis non massa dui. Tincidunt porta velit eget et. Interdum dignissim id tristique ut vitae ut viverra. A cras facilisis malesuada erat.
								                        </Text>
						</ScrollView>
					</View>
				</Modal>
				<View style={{ flex: 0.3 }}>
					<View style={{
						padding: 30,
						alignItems: 'center',
					}}>
						<Image style={{
							width: 130,
							height: 130,
							borderRadius: 63,
							borderWidth: 4,
							borderColor: "white",
							marginBottom: 10,
							position: 'relative'
						}}
							defaultSource={require('../../assets/images/avatar.png')}
							// loadingIndicatorSource={require('../../assets/images/avatar.gif')} 
							source={{ uri: profileImage }}
						/>
						<RNTouchableOpacity onPress={() => actionSheetRef.current?.show()}>
							<Image style={{ bottom: 40, left: 47 }} source={require('../../assets/images/add.png')} />
						</RNTouchableOpacity>
						<Text style={{ fontSize: commonStyle.getModerateScale(14), bottom: 20 }}>Change Profile Photo</Text>
					</View>
				</View>
				<View style={{ marginLeft: 50, marginRight: 50, flex: 0.7 }}>
					<Text style={{ color: '#FF641A' }}>ID</Text>
					<TextInput
						value={ID}
						placeholder=""
						style={{
							alignSelf: 'stretch',
							fontSize: commonStyle.getModerateScale(16),
							marginTop: 7,
							borderBottomColor: '#000',
							borderBottomColor: '#000',
							borderBottomWidth: 1,
							backgroundColor: '#f5f5f5'
						}}
						underlineColorAndroid="transparent"
						editable={false}
						onChangeText={(text) => setFirstName(text)}
					/>

					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(20) }}>First name</Text>
					<TextInput
						value={firstName}
						placeholder=""
						style={{
							alignSelf: 'stretch',
							fontSize: commonStyle.getModerateScale(16),
							marginTop: 7,
							borderBottomColor: '#000',
							borderBottomColor: '#000',
							borderBottomWidth: 1
						}}
						underlineColorAndroid="transparent"
						onChangeText={(text) => setFirstName(text)}
					/>

					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(20) }}>Last name</Text>
					<TextInput
						value={lastName}
						placeholder=""
						style={{
							alignSelf: 'stretch',
							fontSize: commonStyle.getModerateScale(16),
							marginTop: 7,
							borderBottomColor: '#000',
							borderBottomColor: '#000',
							borderBottomWidth: 1
						}}
						underlineColorAndroid="transparent"
						onChangeText={(text) => setLastName(text)}
					/>
					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(20) }}>Location</Text>
					<TextInput
						value={country}
						placeholder=""
						style={{
							alignSelf: 'stretch',
							fontSize: commonStyle.getModerateScale(16),
							marginTop: 7,
							borderBottomColor: '#000',
							borderBottomColor: '#000',
							borderBottomWidth: 1
						}}
						underlineColorAndroid="transparent"
						onChangeText={(text) => setCountry(text)}
					/>
					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(20) }}>City</Text>
					<TextInput
						value={city}
						placeholder=""
						style={{
							alignSelf: 'stretch',
							fontSize: commonStyle.getModerateScale(16),
							marginTop: 7,
							borderBottomColor: '#000',
							borderBottomColor: '#000',
							borderBottomWidth: 1
						}}
						underlineColorAndroid="transparent"
						onChangeText={(text) => setCity(text)}
					/>
					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(20) }}>Share App</Text>
					<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(15) }}>About me</Text>
					<RNTouchableOpacity onPress={() => setModalVisible(true)}>
						<Text style={{ color: '#FF641A', marginTop: commonStyle.getModerateScale(15) }}>View Terms and conditions {'\n'}Privacy Policy Statement</Text>
					</RNTouchableOpacity>
					<RNTouchableOpacity
						onPress={() => go()}
						style={{ alignSelf: 'flex-start', justifyContent: 'center', alignItems: 'center', paddingBottom: commonStyle.getModerateScale(6), marginTop: commonStyle.getModerateScale(2) }}
					>
						<Text style={{ fontWeight: 'bold', alignSelf: 'center', color: '#FF641A', marginTop: commonStyle.getModerateScale(15) }}>SIGNOUT</Text>
					</RNTouchableOpacity>



				</View>
			</ScrollView>
			<View style={{ alignSelf: 'center', margin: commonStyle.getModerateScale(16) }}>
				<Button onClick={() => saveProfile()} text={'Update'} textColor="white" backgroundColor={submitDisbaled == true ? "rgb(159, 159, 159)" : commonStyle.themeColor()} disabled={submitDisbaled} disabled={submitDisbaled} />
			</View>
		</KeyboardAvoidingView>
	)
}
// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#98B3B7',
// 		justifyContent: 'center',
// 	},
// 	header: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 	},
// 	headerText: {
// 		color: 'black',
// 		fontSize: 18,
// 		padding: 26,
// 	},
// 	noteHeader: {
// 		backgroundColor: '#42f5aa',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		borderTopLeftRadius: 50,
// 		borderTopRightRadius: 50,
// 	},
// 	footer: {
// 		flex: 1,
// 		backgroundColor: '#ddd',
// 		bottom: 0,
// 		left: 0,
// 		right: 0,
// 		zIndex: 10,
// 	},
// 	textInput: {
// 		alignSelf: 'stretch',
// 		color: 'black',
// 		padding: 20,
// 		backgroundColor: '#ddd',
// 		borderTopWidth: 2,
// 		borderTopColor: '#ddd',
// 	},

// 	addButton: {
// 		position: 'absolute',
// 		zIndex: 11,
// 		right: 0,
// 		bottom: commonStyle.getModerateScale(40),
// 		backgroundColor: '#98B3B7',
// 		width: 70,
// 		height: 70,
// 		borderRadius: 35,
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		elevation: 8,
// 	},
// 	addButtonText: {
// 		color: '#fff',
// 		fontSize: 18,
// 	},
// });
export default Profile;

