import React, { useState, useContext } from 'react'
import { EdoutContext } from '../../context/index'
import Header from '../../components/header'
import * as commonStyle from '../../includes/main-style';
import { TouchableOpacity } from "react-native-gesture-handler"
import { Container, ImageBackground, Username, FormContainer, TextInput, Content, Heading, InputArea, ButtonView, TNC, CheckboxView, Agree, HyperText, HyperLink, HyperLinkCode, HyperTextCode } from "./createNewAcc-style";
import { View, Text, ScrollView, KeyboardAvoidingView, Modal, StyleSheet } from "react-native";
import Button from '../../components/Button/customButton'
import CheckBox from '@react-native-community/checkbox';
import Amplify, { Auth, Hub } from 'aws-amplify';
import { UploadUser } from '../../services'
import { getUser, setUser, WarningToast as alert } from "../../includes/common-functions";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-navigation'
const CreateNew = ({ route, navigation }) => {
    const { state, dispatch } = useContext(EdoutContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [submitDisbaled, changeSubmitDisbaled] = useState(false);
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [username, onChangeUsername] = useState('')
    const [email, onChangeEmail] = useState(route.params.email ? route.params.email : '')
    const [password, onChangePassword] = useState('')
    const [repassword, onChangeRePassword] = useState('')
    const [code, onChangeCode] = useState('')
    const [isConfirmationSent, confirmationSent] = useState(route.params.email ? true : false)
    const [verfyBtnTxt, setVerfyBtnTxt] = useState('Verify Now')

    go = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (username.trim().length < 1) {
            alert("Please enter valid username")
            return false;
        }
        else if (reg.test(email) === false) {
            alert("Please enter valid email");
            return false;
        }
        else if (password.trim().length < 8) {
            alert("Password length must be 8 character long")
            return false;
        }
        else if (repassword.trim().length < 8) {
            alert("Confirm password length must be 8 character long")
            return false;
        }
        else if (password != repassword) {
            alert("Password and confirm password does not match")
            return false;
        }
        else if (!toggleCheckBox) {
            alert("Accept terms and conditions")
        }
        else {
            changeSubmitDisbaled(true);
            try {
                const { user } = await Auth.signUp({
                    username: email.trim(),
                    password: password.trim(),
                    attributes: {
                        email: email.trim(),
                        given_name: username
                    }
                });
                if (user) {
                    alert("Please check email and enter confirmation code")
                    confirmationSent(true)
                    changeSubmitDisbaled(false);
                }
            }
            catch (error) {
                /*if(error.code == 'UsernameExistsException'){
                    alert(error.message)
                }
                else{
                    alert("something went wrong, Please try again")
                }*/
                alert(error.message)
                changeSubmitDisbaled(false);
                console.log('error signing up:', error);
            }
        }
    }

    async function confirmSignUp() {
        try {
            if (code.trim().length < 1) {
                alert("Enter valid code")
            }
            else {
                changeSubmitDisbaled(true);
                const { result } = await Auth.confirmSignUp(email.trim(), code.trim());
                if (route.params.email) {
                    alert("User confirmed, You can Login now");
                    navigation.navigate("Login")
                }
                else {
                    authlogin()
                    setVerfyBtnTxt("Logging you in...")
                }

            }
        } catch (error) {
            console.log('error confirming sign up', error);
            changeSubmitDisbaled(false);
            alert(error.message)
        }
    }

    async function authlogin() {
        try {
            const user = await Auth.signIn(email.trim(), password.trim());
            console.log("=login user", user)
            _manualuploadUserInfo(user);

        } catch (error) {
            console.log('error signing in', error);
            changeSubmitDisbaled(false);
            setVerfyBtnTxt("Verify Now")
        }
    }

    _manualuploadUserInfo = async (info) => {
        console.log("info=", info)
        dispatch({ type: "SET_USER_INFORMATION", payload: info })//set full info by cognito in context api
        var datecreated = new Date().valueOf();
        const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: "Manual", dateCreated: datecreated, joinedByPlatform: "Mobile" };
        console.log("two", req)
        const userResult = await UploadUser(req);
        console.log("three", userResult)
        if (userResult.success == true) {
            setUser({ ...info.attributes, socialAuthID: info.username }).then((result) => {
                console.log("setuser result", result)
                if (result == 'PASS') {
                    navigation.navigate("Home")
                }
            })
        }
        else {
            console.log("Something went wrong _uploadUserInfo login screen")
            alert("Something went wrong")
        }
    }

    _uploadUserInfo = async (info) => {
        dispatch({ type: "SET_USER_INFORMATION", payload: info })//set full info by cognito in context api
        let identities = JSON.parse(info.attributes.identities);
        const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: identities[0].providerName, dateCreated: identities[0].dateCreated, joinedByPlatform: "Mobile" };
        const userResult = await UploadUser(req);
        if (userResult.success == true) {
            setUser({ ...info.attributes, socialAuthID: info.username }).then((result) => {
                console.log("setuser result", result)
                if (result == 'PASS') {
                    navigation.navigate("Home")
                }
            })
        }
        else {
            console.log("Something went wrong _uploadUserInfo createnewacc screen")
            alert("Something went wrong")
        }
    }

    _manualuploadUserInfo = async (info) => {
        dispatch({ type: "SET_USER_INFORMATION", payload: info })//set full info by cognito in context api
        var datecreated = new Date().valueOf();
        const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: "Manual", dateCreated: datecreated, joinedByPlatform: "Mobile" };
        console.log("two", req)
        const userResult = await UploadUser(req);
        console.log("three", userResult)
        if (userResult.success == true) {
            setUser({ ...info.attributes, socialAuthID: info.username }).then((result) => {
                console.log("setuser result", result)
                if (result == 'PASS') {
                    navigation.navigate("Home")
                }
            })
        }
        else {
            console.log("Something went wrong _uploadUserInfo login screen")
            alert("Something went wrong")
        }
    }

    async function resendConfirmationCode() {
        changeSubmitDisbaled(true);
        try {
            await Auth.resendSignUp(email);
            changeSubmitDisbaled(false);
            alert('code resent successfully');
        } catch (err) {
            alert(err.message)
            console.log('error resending code: ', err);
        }
    }


    return (
        <Container>
            <Header {...navigation} centerTitle={'Create New Account'} backtext='' backIcon={!isConfirmationSent} />
            <ImageBackground source={require('../../assets/images/bg.png')}>
                <Content>
                    {
                        isConfirmationSent === true ?
                            (
                                <FormContainer>

                                    <InputArea>
                                        <Heading>Email Address</Heading>
                                        <TextInput
                                            placeholder=""
                                            placeholderTextColor={'black'}
                                            placeholderStyle={{ left: 20 }}
                                            value={email}
                                            editable={false}
                                            style={{ backgroundColor: '#D3D3D3' }}
                                        />
                                    </InputArea>
                                    <HyperLinkCode onPress={resendConfirmationCode}><HyperTextCode>Resend code</HyperTextCode></HyperLinkCode>
                                    <InputArea>
                                        <Heading>Enter confirmation code</Heading>
                                        <TextInput
                                            placeholder="Enter code"
                                            placeholderTextColor={'#9AA1B0'}
                                            placeholderStyle={{ left: 20 }}
                                            onChangeText={text => onChangeCode(text)}
                                            value={code}
                                        />
                                    </InputArea>
                                    <ButtonView>
                                        <Button onClick={confirmSignUp} text={verfyBtnTxt} textColor="white" backgroundColor={submitDisbaled == true ? "rgb(159, 159, 159)" : commonStyle.themeColor()} disabled={submitDisbaled} />
                                    </ButtonView>
                                </FormContainer>
                            )
                            :
                            (
                                <FormContainer>
                                    <Username>
                                        <Heading>Username</Heading>
                                        <TextInput
                                            placeholder="Enter Name"
                                            placeholderTextColor={'#9AA1B0'} placeholderStyle={{ left: 20 }}
                                            onChangeText={text => onChangeUsername(text)}
                                            value={username}
                                        />
                                    </Username>
                                    <InputArea>
                                        <Heading>Email Address</Heading>
                                        <TextInput
                                            placeholder="xyz@email.com"
                                            placeholderTextColor={'#9AA1B0'} placeholderStyle={{ left: 20 }}
                                            onChangeText={text => onChangeEmail(text)}
                                            value={email}
                                        />
                                    </InputArea>
                                    <InputArea>
                                        <Heading>Password</Heading>
                                        <TextInput
                                            placeholder="Type Password"
                                            placeholderTextColor={'#9AA1B0'} placeholderStyle={{ left: 20 }}
                                            secureTextEntry={true}
                                            onChangeText={text => onChangePassword(text)}
                                            value={password}
                                        />
                                    </InputArea>
                                    <InputArea>
                                        <Heading>Re-Enter Password</Heading>
                                        <TextInput
                                            placeholder="Re-Enter Password"
                                            placeholderTextColor={'#9AA1B0'} placeholderStyle={{ left: 20 }}
                                            secureTextEntry={true}
                                            onChangeText={text => onChangeRePassword(text)}
                                            value={repassword}
                                        />
                                    </InputArea>

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

                                            <TouchableOpacity
                                                style={{ alignSelf: 'flex-end', padding: 3 }}
                                                onPress={() => {
                                                    setModalVisible(false);
                                                }}>
                                                <Icon name='arrow-circle-o-down' size={22} color='white' style={{ alignSelf: 'flex-end' }} />
                                            </TouchableOpacity>

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

                                    <TNC>
                                        <CheckboxView>
                                            <CheckBox
                                                disabled={false}
                                                value={toggleCheckBox}
                                                onValueChange={(newValue) => setToggleCheckBox(newValue)}
                                                boxType="square"
                                                onCheckColor={commonStyle.themeColor()}
                                                onAnimationType='bounce'
                                                onCheckColor={commonStyle.themeColor()}
                                                onTintColor={commonStyle.themeColor()}
                                                style={{ height: commonStyle.getModerateScale(18), width: commonStyle.getModerateScale(18) }}
                                            /></CheckboxView>
                                        <Agree > I agree the <HyperLink onPress={() => setModalVisible(true)}><HyperText>terms and conditions</HyperText></HyperLink></Agree>
                                    </TNC>
                                    <ButtonView>
                                        <Button onClick={go} text="Register Now" textColor="white" backgroundColor={submitDisbaled == true ? "rgb(159, 159, 159)" : commonStyle.themeColor()} disabled={submitDisbaled} />
                                    </ButtonView>
                                </FormContainer>
                            )
                    }
                </Content>
            </ImageBackground>
        </Container>
    )
}
export default CreateNew;

