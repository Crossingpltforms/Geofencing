import React, { useState, createRef } from 'react'
import * as commonStyle from '../../includes/main-style';
import * as style from './my-notes-style'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import Button from '../../components/Button_round/customButton.js'
import {
    Text,
    View,
    FlatList
} from 'react-native';
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Turle Crossing',
        description: 'This place is good for biology'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Play ground',
        description: 'Its is the park for tech and ki'
    },
    {
        id: '58694a0f-3da1-bd96-145571e29d72',
        title: 'Green Hub',
        description: 'Here we can organize events'
    },
    {
        id: '3da1-471f-bd96-145571e29d72',
        title: 'Green Hub',
        description: 'Nearby schools and green tr'
    },
];
const MyNotes = (props) => {
    // const Description = (props) => {
        // console.log("two prp",props.navigation)
        // console.log("two prp",props.params)
    const renderItem = ({ item }) => {
        return (
            <Item item={item} />
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

    return (
        <View style={[{flex: 1}, { backgroundColor: 'white', padding: 15 }]} >
        <style.ScrollViewContent>
            <style.TitleContainer>
                <style.Title>{props.params.selectedActivity.tag}</style.Title>
                <style.SubTitle>{props.params.selectedActivity.place}</style.SubTitle>
            </style.TitleContainer>

            <style.NoteContainer>
                <style.AddNote>Add Public Note</style.AddNote>
                <style.Textarea
                    multiline={true}
                    numberOfLines={14}
                    placeholder="Add description of this location"
                >
                </style.Textarea>
            </style.NoteContainer>

            <style.ButtonContainer>
                <style.Add>
                    <style.TouchableOpacity>
                        <Icon size={commonStyle.getModerateScale(12)} name="plus" color={commonStyle.themeColor()} />
                        <style.ButtonText>Add</style.ButtonText>
                    </style.TouchableOpacity>
                </style.Add>
                <style.Delete>
                    <style.TouchableOpacity>
                        <Icon size={commonStyle.getModerateScale(12)} name="minus" color={'red'} />
                        <style.ButtonText>Delete</style.ButtonText>
                    </style.TouchableOpacity>
                </style.Delete>
                <style.Update>
                    <style.TouchableOpacity>
                        <Icon size={commonStyle.getModerateScale(12)} name="pencil" color={'#ffc107'} />
                        <style.ButtonText>Update</style.ButtonText>
                    </style.TouchableOpacity>
                </style.Update>
            </style.ButtonContainer>
            <style.ListView>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </style.ListView>
            
        </style.ScrollViewContent>
        <View style={{position:'absolute', bottom:10,left:0,right:0, justifyContent:'center'}}>
            <View style={{ margin: commonStyle.getModerateScale(16), alignSelf:'center', }}>
                <Button onClick={()=>props.jumpTo('third')} text={'Next'} textColor="white" backgroundColor={commonStyle.themeColor()} />
            </View>
            <style.GoBackView style={{}}>
                <style.TouchableOpacityBack onPress={()=>props.navigation.goBack()}>
                    <style.ArrowImage source={require('../../assets/images/ArrowBack.png')} />
                    <style.BackText>Go Back</style.BackText>
                </style.TouchableOpacityBack>
            </style.GoBackView>
            </View>
    </View>
    )
}
export default MyNotes;
