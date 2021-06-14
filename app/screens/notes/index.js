import React, { useState, createRef, useContext, useEffect } from 'react'
import { EdoutContext } from '../../context/index'
import { View, StyleSheet, Dimensions, StatusBar, Text, FlatList } from 'react-native';
import { ScrollView, } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import * as commonStyle from '../../includes/main-style';
import { TitleContainer, Title, SubTitle, ScrollViewContent, NoteContainer, AddNote, Textarea, ButtonContainer, Add, Delete, Update, TouchableOpacity, ButtonText, ListView, GoBackView, TouchableOpacityBack, ArrowImage, BackText } from './style';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import Button from '../../components/Button_round/customButton.js'
import Photos from "./photos";
import Description from "./description";
import MyNotes from "./my-notes";
// import {  getSingleLocationData } from '../../services'
const renderItem = ({ item }) => {
	return (
		<Item item={item}/>
	);
};
const Item = ({ item, onPress, style }) => (
	<View style={[{
		marginVertical: commonStyle.getModerateScale(8),
		paddingLeft: 15,
		paddingTop: 15,
		paddingBottom: 15,
		borderColor: '#9AA1B0',
		borderWidth: 0.9,
		borderRadius: commonStyle.getModerateScale(4),
		flexDirection: 'row',
		justifyContent: 'space-between',
	}]}>
		<Text numberOfLines={1} style={{ fontSize: commonStyle.getModerateScale(14), color: '#9AA1B0', flex: 0.9 }}>{item.description}</Text>
		<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			<Icon name='minus' color='red' style={{ alignSelf: 'center' }} />
			<Text style={{ fontSize: commonStyle.getModerateScale(14), color: '#9AA1B0', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }} numberOfLines={3}>Delete</Text>
		</View>
	</View>
);

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewScreen({route, navigation}) {
	const { state, dispatch } = useContext(EdoutContext)
	const [index, setIndex] = useState(0);
	const [submitDisbaled, changeSubmitDisbaled] = useState(false);
	const [routes] = useState([
		{ key: 'first', title: 'Discription' },
		// { key: 'second', title: 'My Notes' },
		{ key: 'third', title: 'Photos' },

	]);

	
	
	const renderScene = (props) => {
		switch (props.route.key) {
		  case 'first':
			return <Description {...props} {...{navigation}} {...route} />;
		//   case 'second':
		// 	return <MyNotes {...props} {...{navigation}} {...route}/>;
		  case 'third':
			return <Photos {...props} {...{navigation}} {...route}/>;
		  default:
			return null;
		}
	  }

	return (
		<TabView
			navigationState={{ index, routes }}
			renderTabBar={props => (
				<TabBar
					lazy={true}
					{...props}
					renderLabel={({ route, color }) => (
						<Text style={{ color: 'black', margin: 8, fontSize: 17 }}>
							{route.title}
						</Text>
					)}
					style={{ backgroundColor: 'white' }}
					indicatorStyle={{ backgroundColor: commonStyle.themeColor(), height: 2 }}

				/>
			)}
			renderScene={renderScene}
			onIndexChange={setIndex}
			initialLayout={initialLayout}
			style={styles.container}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
	},
	scene: {
		flex: 1,
	},
});
