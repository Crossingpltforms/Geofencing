import React, { useState, createRef, useContext, useEffect } from 'react'
import { EdoutContext } from '../../context/index'
import * as commonStyle from '../../includes/main-style';
import Header from '../../components/header/profile_header.js'
import { RNS3 } from 'react-native-aws3';
import { AddLocationPhoto } from '../../services'
import { Container, Content, AddPhotosWrapper, PhotoContainer, TextAddPhoto, ImageAdd, ListPhotosWrapper, LocationImage, Saperate, GoBackView, TouchableOpacityBack, ArrowImage, BackText, ViewOne, ViewTwo, ScrollView, ActionSheetContainer, Option, Optiontext, OptionCanceltext, Saperater } from './photos-tab-style';
import ActivityIndicator from '../../components/Activity-Indicator';
import Button from '../../components/Button_round/customButton.js'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

import ImageResizer from 'react-native-image-resizer';
import ActionSheet from "react-native-actions-sheet";
import { WarningToast as alert } from '../../includes/common-functions';
const actionSheetRef = createRef();
let imageArrGlobal = []
let imageNameGlobal = null
const Photos = (props) => {
    let actionSheet;
    const [loader, setLoader] = useState(false);
    const { state, dispatch } = useContext(EdoutContext)
    const [submitDisbaled, changeSubmitDisbaled] = useState(false);
    const [signleLocationState, setSignleLocationState] = useState(state.singleLocation);

    const _openImagePicker = (option) => {
        ImagePicker.openCamera({
            width: 1200,
            height: 900,
            cropping: true,
            mediaType: 'photo',
        }).then(response => {
            console.log("response", response);
            setLoader(true)
            imageAlogo(response)
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

    const _openLibraryPicker = (option) => {
        ImagePicker.openPicker({
            width: 1200,
            height: 900,
            cropping: true,
            mediaType: 'photo',
        }).then(response => {
            console.log("response", response);
            setLoader(true)
            imageAlogo(response)
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
    imageAlogo = (response) => {
        const datetime = new Date().valueOf();
        const imagename = datetime + `_` + state.userInformation.username + '_FULL.jpg';
        imageNameGlobal = imagename;
        imageArrGlobal.push({ uri: response.path, name: imagename, type: 'image/jpeg' })
        ImageResizer.createResizedImage(response.path, 200, 200, 'JPEG', 100, 0, undefined, false)
            .then(response2 => {
                const imagename2 = datetime + `_` + state.userInformation.username + '_TH.jpg';
                imageArrGlobal.push({ uri: response2.uri, name: imagename2, type: 'image/jpeg' })
                // actionSheetRef.current?.hide()
                uploadFile()
            })
            .catch(err => {
                console.log(" error createResizedImage err>", err)
                // Oops, something went wrong. Check that the filename is correct and
                // inspect err to get more details.
                alert("Try again!!!")
                actionSheetRef.current?.hide()
                setLoader(false)
            });
    }

    const uploadFile = () => {
        console.log("uploadFile map calling", imageArrGlobal)
        const config = {
            keyPrefix: state.singleLocation.lat + "|" + state.singleLocation.lng + "/", // Ex. myuploads/
            bucket: "edoutlocationphotos", // Ex. aboutreact
            region: 'us-west-2', // Ex. ap-south-1
            accessKey: 'AKIA3MVB6V4R7G5I2BFM',// Ex. AKIH73GS7S7C53M46OQ
            secretKey: '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',// Ex. Pt/2hdyro977ejd/h2u8n939nh89nfdnf8hd8f8fd
            successActionStatus: 201,
        };
        let i = 1;
        console.log("imageArrGlobal map calling", imageArrGlobal)
        setLoader(true)
            return new Promise((resolve, reject)=>{
                imageArrGlobal.map((image) => {
                    RNS3.put(image, config)
                    .progress((progress) => {
                        console.log("Uploading", `Uploading: ${progress.loaded / progress.total} (${progress.percent}%)`)
                    })
                    .then((response) => {
                        if (i == imageArrGlobal.length) {
                            console.log('=============********************================');
                            console.log(response);
                            let { key, etag, location, bucket } = response.body.postResponse;
                            if (response.status !== 201) {
                                setLoader(false);
                                alert('Failed to upload image');
                            } else {
                                console.log(`Uploaded Successfully: \n1. bucket => ${bucket}\n2. etag => ${etag}\n3. key => ${key}\n4. location => ${location}`)
                                uploadImagetoDynamo(imageNameGlobal)
                                imageArrGlobal = [];
                            }
                        }
                        i++;
                    }).catch((err)=>
                        {
                            console.log(err, imageArrGlobal.length, i)
                            setLoader(false)
                            if (i == imageArrGlobal.length) {
                                alert("Image not uploaded, Try again!!!")
                            }
                            i++;
                            return false;
                        }
                    )
                });
            });
                

        
            
               
            
        
    };

    uploadImagetoDynamo = async (imagename) => {
        console.log("uploadImagetoDynamo method called")
        const request = {
            "lat": state.singleLocation.lat,
            "lng": state.singleLocation.lng,
            "photos":
            {
                "date": new Date().toISOString(),
                "name": imagename,
                "owner": state.userInformation.attributes.email,
                "status": "Proposed"
            }
        }
        const response = await AddLocationPhoto(request);
        if (response.success == true) {
            actionSheetRef.current?.hide()
            if (state.singleLocation.photos) {
                const item = [request.photos, ...state.singleLocation.photos]
                const item2 = { ...state.singleLocation, photos: item }
                dispatch({ type: "SET_SINGLE_LOCATION", payload: item2 })
                setLoader(false)
            }
            else {
                actionSheetRef.current?.hide()
                const item = { ...state.singleLocation, photos: [request.photos] }
                dispatch({ type: "SET_SINGLE_LOCATION", payload: item })
                setLoader(false)
            }

        } else {
            alert("Photo not uploaded")
            setLoader(false)
        }
    }

    // uploadS3 = (image) => {
    //     const datetime = new Date().valueOf();
    //     const imagename = datetime + `_` + state.userInformation.username + '.jpg';
    //     console.log(imagename)
    //     var data = new FormData();
    //     data.append('files',
    //         { uri: image.uri, name: imagename, type: 'image/jpeg' }
    //     );
    // }
    return (
        <Container>
            <Content>
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
                    {
                        (loader)
                            ?
                            (<ActivityIndicator visible={loader} />)
                            :
                            (null)
                    }
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
                <AddPhotosWrapper>
                    <TextAddPhoto>Add Photo</TextAddPhoto>
                    <PhotoContainer
                        onPress={() => {
                            actionSheetRef.current?.show()
                        }}>
                        <ImageAdd source={require('../../assets/images/add.png')} />
                    </PhotoContainer>
                </AddPhotosWrapper>

                {
                    
                    (state.singleLocation.photos) && (state.singleLocation.photos.length > 0) ? (
                        <ScrollView alwaysBounceVertical={false} indicatorStyle={'black'} showsVerticalScrollIndicator={false}>
                            {
                                state.singleLocation.photos.map((item, index) => {
                                    return (
                                        <ListPhotosWrapper key={index}>
                                            <LocationImage
                                                resizeMode="stretch"
                                                defaultSource={require('../../assets/images/placeholder.png')}
                                                source={{ uri: `https://edoutlocationphotos.s3-us-west-2.amazonaws.com/${state.singleLocation.lat}|${state.singleLocation.lng}/${item.name}` }}
                                                onError={(err) =>
                                                    console.log("----err in load image", item.name)
                                                }
                                            />
                                        </ListPhotosWrapper>
                                    )
                                })
                            }
                        </ScrollView>
                    ) :
                        (
                            null
                        )
                }

                <ViewOne >
                    <ViewTwo >
                        <Button onClick={() => props.jumpTo('first')} text={'Next'} textColor="white" backgroundColor={commonStyle.themeColor()} />
                    </ViewTwo>
                    <GoBackView style={{}}>
                        <TouchableOpacityBack onPress={() => props.navigation.goBack()}>
                            <ArrowImage source={require('../../assets/images/ArrowBack.png')} />
                            <BackText>Go Back</BackText>
                        </TouchableOpacityBack>
                    </GoBackView>
                </ViewOne>
            </Content>
        </Container>
    )
}
export default Photos;
