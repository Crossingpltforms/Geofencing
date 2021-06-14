import React, { useState } from 'react'
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text, Image, ImageBackground, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import * as commonStyle from '../../includes/main-style';
const slides = [{key: 1},{key: 2},{key: 3}];

renderNextButton = () => {
	return (
		<View style={{
			alignSelf : 'center',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection:'row'
		}}>
			<Text style={{
				color : 'white',
				fontSize: commonStyle.getModerateScale(20),
				fontWeight : '600',
				alignSelf : 'center',
				} } >Next</Text>
			<Icon
				name="chevron-right"
				color="rgba(255, 255, 255, .9)"
				size={commonStyle.getModerateScale(20)}
				style={{alignSelf : 'center', left:3, top : 2}}
			/>
		</View>
	);
};

_onSlideChange = (index, lastNumber) => {
	// console.log(index, lastNumber)
}

const Intro = ({ routes,navigation }) => {
	_renderItem = ({ item }) => {
		switch (item.key) {
			case 1:
				return (
					<ImageBackground source={require('../../assets/images/bg.png')} style={{ flex: 1 }} kay={1}>
						<View style={{
							flex: 0.6,
							justifyContent: 'center'
						}}>
							<Image style={{
								height: commonStyle.getModerateScale(150),
								width: commonStyle.getModerateScale(200),
								alignSelf: 'center'
							}} source={require('../../assets/images/contributortoolkit.gif')}></Image>
						</View>

						<View style={{ flex: 0.4, padding: 30 }}>
							<View style={{ justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: commonStyle.getModerateScale(40), color: 'white', fontWeight: 'bold' }}>
									Hello
							</Text>
								<Text style={{ fontSize: commonStyle.getModerateScale(20), color: 'white', fontWeight: '600', marginTop: commonStyle.getModerateScale(16), textAlign: 'center' }} numberofLines={3}>
									Welcome to the EdOut Learning Community of Contributors
							</Text>

							</View>
						</View>
						{/* <View style={{
							flexDirection: 'row',
							position: 'absolute',
							bottom: commonStyle.getModerateScale(0),
							justifyContent: 'center',
							alignItems: 'center', alignSelf: 'center'
						}}>
							<Text style={{
								color: 'white',
								fontSize: commonStyle.getModerateScale(14)
							}}>Already a member ? </Text>
							<TouchableOpacity style={{ color: 'white', fontSize: commonStyle.getModerateScale(18), fontWeight: 'bold', }} onPress={() => navigation.navigate('Login')}>
								<Text style={{ color: 'white', fontSize: commonStyle.getModerateScale(18), fontWeight: 'bold' }}> Sign in</Text>
							</TouchableOpacity>
						</View> */}
					</ImageBackground>
				);
				break;
			case 2:
				return (
					<View style={{ backgroundColor: commonStyle.themeColor(), flex: 1 }} kay={2}>
						<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: commonStyle.getModerateScale(40) }}>
							<Text style={{ fontWeight: '600', fontSize: commonStyle.getModerateScale(40), color: 'white', alignSelf: 'center' }}>What we do</Text>
						</View>
						
						<View style={{ padding: commonStyle.getModerateScale(14), marginTop: commonStyle.getModerateScale(40) }}>
							<Text style={{ fontWeight: 'bold', fontSize: commonStyle.getModerateScale(14), color: 'white', alignSelf: 'center', textAlign: 'justify' }} >
								Lorem ipsum dolor sit amet, consectetur  Duis nec justo gravida felis placerat malesuada et eu magna. Aliquam et luctus lacus, non bibendum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum, turpis sit amet tincidunt tempor, neque lorem interdum risus, vel elementum nulla magna at justo. Etiam dapibus turpis quis odio lacinia mollis. In hac habitasse platea dictumst.
							</Text>
						</View>
					</View>
				);
				break;
			case 3:
				return (
					<View style={{ backgroundColor: commonStyle.themeColor(), flex: 1 }} kay={3}>
						<View style={{ justifyContent: 'center', alignItems: 'center', marginTop: commonStyle.getModerateScale(40) }}>
							<Text style={{ fontWeight: '600', fontSize: commonStyle.getModerateScale(40), color: 'white', alignSelf: 'center' }}>Read Carefully</Text>
						</View>
						<View style={{ padding: commonStyle.getModerateScale(14), marginTop: commonStyle.getModerateScale(40) }}>
							<Text style={{ fontWeight: 'bold', fontSize: commonStyle.getModerateScale(18), color: 'white', alignSelf: 'center', textAlign: 'justify', textDecorationLine: 'underline' }}>Terms and Conditions</Text>

							<Text style={{ fontWeight: '600', fontSize: commonStyle.getModerateScale(14), color: 'white', alignSelf: 'center', textAlign: 'justify', marginTop: commonStyle.getModerateScale(12) }} >
								Lorem ipsum dolor sit amet, consectetur  Duis nec justo gravida felis placerat malesuada et eu magna. Aliquam et luctus lacus, non bibendum mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum, turpis sit amet tincidunt tempor, neque lorem interdum risus, vel elementum nulla magna at justo. Etiam dapibus turpis quis odio lacinia mollis. In hac habitasse platea dictumst.
							</Text>
						</View>
					</View>
				);
				break;
			default:
				null;
		}

	}

	_renderDoneButton = () => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Signup')} >
				<View style={{
			alignSelf : 'center',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection:'row'
		}}>
			<Text style={{
				color : 'white',
				fontSize: commonStyle.getModerateScale(20),
				fontWeight : '600',
				alignSelf : 'center',
				} } >Done</Text>
			<Icon
				name="chevron-right"
				color="rgba(255, 255, 255, .9)"
				size={commonStyle.getModerateScale(20)}
				style={{alignSelf : 'center', left:3, top : 2}}
			/>
		</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={{flex:1}}>
			<AppIntroSlider
				data={slides}
				renderDoneButton={_renderDoneButton}
				renderNextButton={renderNextButton}
				renderItem={_renderItem}
				// onSlideChange={_onSlideChange}
				keyExtractor={item => item.index_id}
				// nextLabel="Next"
				// doneLabel="Done"
				onDone={()=>navigation.navigate('Signup')}
				bottomButton = {true}

			/>
		</View>
	)
}
export default Intro;

