import React, { useState, createRef, useContext, useEffect } from 'react'
import _ from 'lodash'
import { EdoutContext } from '../../context/index'
import * as commonStyle from '../../includes/main-style';
import * as style from './description-style'
import CheckBox from '@react-native-community/checkbox';
import { AddLocationNotes, DeleteLocationNotes, UpdateLocationNotes, getSingleLocationData } from '../../services'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import Button from '../../components/Button_round/customButton.js'
import { WarningToast as alert } from '../../includes/common-functions'

import {
    Text,
    View,
    FlatList,
    Touchable
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Description = (props) => {
    const { state, dispatch } = useContext(EdoutContext)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [mode, setMode] = useState('Add')
    const [noteValue, setNoteValue] = useState("")
    const [updateNoteItem, setUpdateNoteItem] = useState({})
    const [updateNoteIndex, setUpdateNoteIndex] = useState({})


    // const [idx, setIdx] = useState(0)//to caluclate pagin
    // const [allNotesPagin, setAllNotesPagin] = useState([])
    // const [totalNotes, setTotalNotes] = useState(null)
    // const [currentPage, setCurrentPage] = useState(1)
    // const [notePerPage, setNotePerPage] = useState(3)
    // const [leftIndex, setLeftIndex] = useState(null)
    // const [rightIndex, setRightIndex] = useState(0)

    useEffect(() => {
        // get Single Location from server by lat lng
        _fetchSingleLocationData();
    }, [])


    _fetchSingleLocationData = async () => {
        const request = { lat: state.singleLocation.lat, lng: state.singleLocation.lng, owner: state.userInformation.attributes.email }
        console.log("request", request)
        const response = await getSingleLocationData(request);
        console.log("response", JSON.stringify(response.data[0], null, 2), response.data[0].notes.length)
        if (response.success == true) {//response.success needs to coorect on backend(Something went wrong)
            dispatch({ type: "SET_SINGLE_LOCATION", payload: response.data[0] })
            if (response.data[0].notes) {
                // setTotalNotes(response.data[0].notes.length)
                // dispatch({ type: "SET_NOTES", payload: response.data[0].notes })
                // const Arr = response.data[0].notes.splice(idx, 3);
                // setAllNotesPagin(Arr)
                // setRightIndex(Arr.length)
                // setLeftIndex(1)
            }
            else {
                dispatch({ type: "SET_NOTES", payload: {} })
            }

        }
        else {
            alert(response.message)
        }
    }

    updateModeOn = (item, index) => {
        setMode("Update")
        if (!item.private) {
            setToggleCheckBox(false)
        }
        else {
            setToggleCheckBox(item.private)
        }
        setUpdateNoteItem(item)

        setUpdateNoteIndex(state.singleLocation.notes.indexOf(item))
        setNoteValue(item.note)
    }

    cancelUpdateMode = (item, index) => {
        setMode("Add")
        setToggleCheckBox(false)
        setUpdateNoteItem({})
        setNoteValue("")
    }

    const renderItem = ({ item, index }) => {

        return (
            <Item item={item} index={index} />
        );
    };

    const Item = ({ item, index }) => (
        //To hide private notes of others
        // item.private == true && item.owner != state.userInformation.attributes.email? 
        // null : 
        <View style={[{
            marginVertical: commonStyle.getModerateScale(8),
            paddingLeft: 15,
            paddingTop: 5,
            paddingBottom: 5,
            borderColor: item.private == true ? commonStyle.themeColor() : '#9AA1B0',
            borderWidth: 0.9,
            borderRadius: commonStyle.getModerateScale(4),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
        }]}>
            <TouchableOpacity onPress={() => updateModeOn(item, index)}
                disabled={item.owner != state.userInformation.attributes.email ? true : false}
                style={{ flexDirection: 'column' }}
            >
                <Text style={{ fontSize: commonStyle.getModerateScale(14), color: '#9AA1B0', flex: 0.9 }}>{item.note}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => removeNote(item)}
                style={{ justifyContent: 'center', alignItems: 'center', padding: 10, }}
                disabled={item.owner != state.userInformation.attributes.email ? true : false}
            >
                {
                    item.owner != state.userInformation.attributes.email ?
                        (
                            <Icon name='lock' size={20} color='gray' style={{ alignSelf: 'center' }} />
                        )
                        :
                        (
                            <Icon name='trash' size={20} color='orange' style={{ alignSelf: 'center' }} />
                        )
                }
                {/* <Text style={{ fontSize: commonStyle.getModerateScale(14), color: '#9AA1B0', alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }} numberOfLines={3}>Delete</Text> */}
            </TouchableOpacity>

        </View>

    );
    removeNote = async (item) => {
        state.singleLocation.notes.splice(state.singleLocation.notes.indexOf(item), 1) //Get index of deleting object from notes array, and remove that index value
        console.log("state.singleLocation.notes", state.singleLocation.notes)
        const request = {
            "lat": state.singleLocation.lat,
            "lng": state.singleLocation.lng,
            "notes": item
        }
        console.log("request body to add notes", request);
        const response = await DeleteLocationNotes(request);
        if (response.success == true) {
            dispatch({ type: "SET_SINGLE_LOCATION", payload: state.singleLocation }) //set local context for single location
        }
        else {
            // alert(response.message)
        }
    }

    SubmitNote = (mode) => { //To add fresh notes
        // state.singleLocation.notes
        if (!noteValue || noteValue.trim().length < 0) {
            alert("Please enter notes")
        }
        else {
            const noteObj = {
                "date": new Date().toLocaleString(),
                "note": noteValue.trim(),
                "owner": state.userInformation.attributes.email,
                "private": toggleCheckBox
            }
            // toggleCheckBox == true ? uploadPrivateNoteApi(noteObj) : uploadNoteApi(noteObj)
            uploadNoteApi(noteObj)
        }
    }


    uploadNoteApi = async (noteObj) => { //To add fresh notes
        const request = {
            "lat": state.singleLocation.lat,
            "lng": state.singleLocation.lng,
            "noteObj": noteObj
        }
        console.log("request body to add notes", request)
        const response = await AddLocationNotes(request);
        if (response.success == true) {
            if (state.singleLocation.notes) {
                const item = [noteObj, ...state.singleLocation.notes]
                const item2 = { ...state.singleLocation, notes: item }
                dispatch({ type: "SET_SINGLE_LOCATION", payload: item2 })
            }
            else {
                const item = { ...state.singleLocation, notes: [noteObj] }
                dispatch({ type: "SET_SINGLE_LOCATION", payload: item })
            }
            setNoteValue('')
            setToggleCheckBox(false)
        }
        else {
            alert("Notes not added")
        }
    }

    updateNote = async (mode) => {
        if (!noteValue || noteValue.trim().length < 0) {
            alert("Please enter notes")
        }
        else {
            const noteObj = {
                "date": new Date().toLocaleString(),
                "note": noteValue.trim(),
                "owner": state.userInformation.attributes.email,
                "private": toggleCheckBox
            }
            const request = {
                "lat": state.singleLocation.lat,
                "lng": state.singleLocation.lng,
                "updateIndex": updateNoteIndex,
                "noteObj": noteObj
            }

            const response = await UpdateLocationNotes(request);

            if (response.success == true) {
                state.singleLocation.notes.splice(updateNoteIndex, 1, noteObj) //splice index value and replace with new
                dispatch({ type: "SET_SINGLE_LOCATION", payload: state.singleLocation })
            }
            else {
                alert(response.message)
            }
        }
    }


    return (
        <View style={[{ flex: 1 }, { backgroundColor: 'white', padding: 15 }]} >
            <style.TitleContainer>
                <style.Title>{state.singleLocation.tag}</style.Title>
                <style.SubTitle>{state.singleLocation.place}</style.SubTitle>
            </style.TitleContainer>

            <style.ContainerAuthor>
                <style.ContainerAuthorName><Icon name="user" size={commonStyle.getModerateScale(12)} px color={commonStyle.themeColor()} />  {state.singleLocation.creator}</style.ContainerAuthorName>
                <style.ContainerAuthorDate><Icon name="calendar" size={commonStyle.getModerateScale(12)} px color={commonStyle.themeColor()} />  {state.singleLocation.date}</style.ContainerAuthorDate>
            </style.ContainerAuthor>

            <style.NoteContainer>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                    <style.AddNote>Add Note</style.AddNote>
                    <style.PaginContainer >
                        <style.LeftButtonPagin onPress={() => console.log("Pre clicked")}>
                            {/* <Icon name='chevron-left' size={22} color={commonStyle.themeColor()} /> */}
                        </style.LeftButtonPagin>
                        {
                            state.singleLocation?.notes?.length > 0 ? (
                                <style.Pagenumber>
                                    {1} - {state.singleLocation.notes.length}
                                </style.Pagenumber>
                            ) : (null)
                        }


                        <style.RightButtonPagin onPress={() => console.log("Next clicked")}>
                            {/* <Icon name='chevron-right' size={22} color={commonStyle.themeColor()} /> */}
                        </style.RightButtonPagin>

                    </style.PaginContainer>
                </View>
                <style.Textarea
                    multiline={true}
                    numberOfLines={14}
                    placeholder="Add description of this location"
                    onChangeText={(text) => setNoteValue(text)}
                    value={noteValue}
                >
                </style.Textarea>
            </style.NoteContainer>
            <style.CheckBoxContainer>
                <CheckBox
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    boxType="square"
                    onCheckColor={commonStyle.themeColor()}
                    onAnimationType='bounce'
                    onCheckColor={commonStyle.themeColor()}
                    onTintColor={commonStyle.themeColor()}
                    style={{ height: commonStyle.getModerateScale(18), width: commonStyle.getModerateScale(18) }}
                />

                <style.AddCheckBoxText>
                    Private
                </style.AddCheckBoxText>
                {/* <style.CheckboxSubtitle> ( Private note will not visible to public)</style.CheckboxSubtitle> */}
            </style.CheckBoxContainer>

            <style.ButtonContainer>
                {
                    mode == "Update" ?
                        (
                            <>
                                <style.Update>
                                    <style.TouchableOpacity onPress={() => updateNote("Update")}>
                                        {/* <Icon size={commonStyle.getModerateScale(12)} name="pencil" color={'#ffc107'} /> */}
                                        <style.ButtonText>Save</style.ButtonText>
                                    </style.TouchableOpacity>
                                </style.Update>
                                <style.Update>
                                    <style.TouchableOpacity onPress={() => cancelUpdateMode()}>
                                        {/* <Icon size={commonStyle.getModerateScale(12)} name="close" color={'#ffc107'} /> */}
                                        <style.ButtonText>Cancel</style.ButtonText>
                                    </style.TouchableOpacity>
                                </style.Update>
                            </>
                        )

                        : (
                            <style.Add>
                                <style.TouchableOpacity onPress={() => SubmitNote("Add")}>
                                    <Icon size={commonStyle.getModerateScale(12)} name="plus" color={commonStyle.themeColor()} />
                                    <style.ButtonText>Add</style.ButtonText>
                                </style.TouchableOpacity>
                            </style.Add>
                        )
                }

                {/* <style.Delete>
                        <style.TouchableOpacity >
                            <Icon size={commonStyle.getModerateScale(12)} name="minus" color={'red'} />
                            <style.ButtonText>Delete</style.ButtonText>
                        </style.TouchableOpacity>
                    </style.Delete>
                    <style.Update>
                        <style.TouchableOpacity>
                            <Icon size={commonStyle.getModerateScale(12)} name="pencil" color={'#ffc107'} />
                            <style.ButtonText>Update</style.ButtonText>
                        </style.TouchableOpacity>
                    </style.Update> */}
            </style.ButtonContainer>
            <style.ScrollViewContent>
                <style.ListView>
                    <FlatList
                        data={state.singleLocation.notes}
                        // data={allNotesPagin}
                        renderItem={(item, index) => renderItem(item, index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </style.ListView>
            </style.ScrollViewContent>
            {/* <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'center' }}> */}
            <View style={{ justifyContent: 'center' }}>
                <View style={{ margin: commonStyle.getModerateScale(16), alignSelf: 'center', }}>
                    <Button text={'Next'} onClick={() => props.jumpTo('third')} textColor="white" backgroundColor={commonStyle.themeColor()} />
                </View>
                <style.GoBackView style={{}}>
                    <style.TouchableOpacityBack onPress={() => props.navigation.goBack()}>
                        <style.ArrowImage source={require('../../assets/images/ArrowBack.png')} />
                        <style.BackText>Go Back</style.BackText>
                    </style.TouchableOpacityBack>

                </style.GoBackView>
            </View>
        </View>
    )
}
export default Description;
