import React, { useState } from 'react'

import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
// Icon.loadFont()
import * as commonStyle from '../../includes/main-style';
import { AlText } from '../signup/style';


const Events = ({ routes, navigation }) => {
	const [data, setData] = useState([
		{
			id: 1,
			title: 'Turtle crossing'
		},
		{
			id: 2,
			title: 'Play ground'
		},
		{
			id: 3,
			title: 'Green hub'
		},
		{
			id: 4,
			title: 'Play ground'
		},
		{
			id: 5,
			title: 'Green hub'
		}
	])
	function _renderCard() {
		return data.map((item) => {
			return (
				<TouchableOpacity onPress={() => navigation.navigate('Notes')} style={{ backgroundColor: commonStyle.themeColor(), borderRadius: 15, marginTop: commonStyle.getModerateScale(20), flexDirection: 'row', }} key={item.id}>
					<View style={{ flex: 0.1, marginLeft: 20 }}>
						<Image source={require('../../assets/images/1eventmarker.png')}
							style={{
								// position: 'absolute',
								bottom: commonStyle.getModerateScale(14),
								// alignSelf:'flex-start',
								height: commonStyle.getModerateScale(50),
								width: commonStyle.getModerateScale(40),
							}}
							resizeMode='contain'
						/>
					</View>
					<View style={{ flex: 0.8, justifyContent: 'center' }}>
						<Text style={{ fontWeight: '800', color: 'white', fontSize: commonStyle.getModerateScale(16), marginLeft: commonStyle.getModerateScale(7) }} numberOfLines={1}>{item.title}</Text>
					</View>
					<View style={{ flex: 0.1, justifyContent: 'center', alignItems: 'center' }}>
						<Icon name="angle-right" style={{ alignSelf: 'center' }} color="white" size={commonStyle.getModerateScale(30)} />
					</View>
				</TouchableOpacity>
			)
		})
	}
	return (
		<View style={{ flex: 1, backgroundColor: 'white', padding: 10 }}>
			<View style={{
				backgroundColor: 'white', flexDirection: 'row', marginVertical: 10, marginHorizontal: 10, borderRadius: commonStyle.getModerateScale(20), padding: commonStyle.getModerateScale(9), borderColor: '#9AA1B0', borderWidth: 0.6, shadowColor: "#000",
				shadowOffset: {
					width: 0,
					height: 2,
				},
				shadowOpacity: 0.25,
				shadowRadius: 3.84,

				elevation: 5,
				alignSelf: 'flex-end'
			}}>
				<TouchableOpacity activeOpacity={.5} onPress={() => navigation.goBack()}>
					<Image source={require('../../assets/images/iconmap_gray.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} />
				</TouchableOpacity>
				<TouchableOpacity style={{ marginLeft: 12, marginRight: 12 }} activeOpacity={.5}>
					<Image source={require('../../assets/images/iconclipboard_selected.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} />
				</TouchableOpacity>
				<TouchableOpacity
					style={{

					}}
					activeOpacity={.5}
					onPress={() => navigation.navigate('Profile')}
				>
					<Image source={require('../../assets/images/iconfilter.png')} style={{ height: commonStyle.getModerateScale(25), width: commonStyle.getModerateScale(25) }} />
				</TouchableOpacity>

			</View>
			<View>
				{_renderCard()}


			</View>
		</View>
	)
}
export default Events;

