import React, { useState, useContext } from 'react'
import { Linking, Alert } from "react-native";
import {EdoutContext}  from '../../context/index'
import { TextInput, Container, Text, Content, PageTitleWrapper, PageTitle, FormContainer, Username, Forget, ForgetText, Password, OrText, OrContainer, Facebook, Google, Apple, Amazon, Image, SocialConatiner, AmazonImage, AppleImage } from "./style";
import * as commonStyle from '../../includes/main-style';
import Header from '../../components/header'
import Button from '../../components/Button/customButton.js'
import Amplify, { Auth, Hub } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import awsconfig from '../../../aws-exports';
import { SignedOutMessage } from 'aws-amplify-react-native/dist/AmplifyUI';
import ActivityIndicator from '../../components/Activity-Indicator';
import { UploadUser } from '../../services'
import { getUser, setUser, WarningToast as alert } from "../../includes/common-functions";


const Login = ({ navigation }) => {
	const [loader, setLoader] = useState(false);
	const [email, onChangeEmail] = useState('')
	const [password, onChangePassword] = useState('')
	const [submitDisbaled, changeSubmitDisbaled] = useState(false);
	const {state,dispatch} = useContext(EdoutContext)
	const [verfyBtnTxt, setVerfyBtnTxt] = useState('Log in')
	async function urlOpener(url, redirectUrl) {
		await InAppBrowser.isAvailable();
		const { type, url: newUrl } = await InAppBrowser.openAuth(url, redirectUrl, {
			showTitle: false,
			enableUrlBarHiding: true,
			enableDefaultShare: false,
			ephemeralWebSession: false,
		});

		if (type === 'success') {
			console.log("newUrl",newUrl)
			const splitUrl = `contributortoolkit://?${newUrl.split("#_=_")[0].split("?")[1] || ''}`;
			console.log("splitUrl",splitUrl)
			Linking.openURL(splitUrl);
			setLoader(true)
		}
	}

	Amplify.configure({
		...awsconfig,
		oauth: {
			...awsconfig.oauth,
			urlOpener,
		},
	});

	go = () => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (email.trim().length < 1) {
			alert("Please enter valid email");
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
		else {
			changeSubmitDisbaled(true)
			authlogin();
			setVerfyBtnTxt("Logging you in...")
		}
	}
	async function authlogin() {
		try {
			const user = await Auth.signIn(email.trim(), password.trim());
			console.log("=login user", user)
			_manualuploadUserInfo(user);
		} catch (error) {
			console.log('error signing in', error);
			if (error.code == 'UserNotConfirmedException') {
				alert("one"+error.message);
				alertNotConfirmed(error.message)
			}
			else {
				alert("two"+error.message);
				changeSubmitDisbaled(false);
				setVerfyBtnTxt("Log in");
			}
		}
	}

	_uploadUserInfo = async (info) => {
		dispatch({type:"SET_USER_INFORMATION",payload:info})//set full info by cognito in context api
		let identities = JSON.parse(info.attributes.identities);
		console.log("one",identities)
		const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: identities[0].providerName, dateCreated: identities[0].dateCreated, joinedByPlatform: "Mobile" };
		console.log("two",req)
		const userResult = await UploadUser(req);
		console.log("three",userResult)
		if (userResult.success == true) {
			setUser({ ...info.attributes, socialAuthID: info.username}).then((result) => {
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
	_manualuploadUserInfo = async (info) => {
		dispatch({type:"SET_USER_INFORMATION",payload:info})//set full info by cognito in context api
		var datecreated = new Date().valueOf();
		const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: "Manual", dateCreated: datecreated, joinedByPlatform: "Mobile" };
		console.log("two",req)
		const userResult = await UploadUser(req);
		console.log("three",userResult)
		if (userResult.success == true) {
			setUser({ ...info.attributes, socialAuthID: info.username}).then((result) => {
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

	async function alertNotConfirmed(msg) {
		Alert.alert(
			msg,
			'You want to confirm ?',
			[
				{
					text: 'Cancel',
					onPress: () => { changeSubmitDisbaled(false); setVerfyBtnTxt("Log in") },
					style: 'cancel',
				},
				{ text: 'Yes', onPress: () => resendConfirmationCode() },
			],
			{ cancelable: false }
		)
	}

	async function resendConfirmationCode() {
		try {
			await Auth.resendSignUp(email);
			changeSubmitDisbaled(false);
			setVerfyBtnTxt("Log in");
			navigation.navigate("CreateNewAcc", { email: email.trim() })
			alert("Please check email and enter confirmation code")
		} catch (err) {
			console.log('error resending code: ', err);
		}
	}


	React.useEffect(() => {
		console.log("***********LOGIN SCREEN************")
		Hub.listen('auth', ({ payload: { event, data } }) => {
			console.log("event", event)
			switch (event) {
				case 'signIn':
				// break;

				case 'cognitoHostedUI':
					getUser().then((userData) => {
						setLoader(false)
						console.log("after sign in userData", "----====", userData);
						_uploadUserInfo(userData);
					});
					break;
				case 'signOut':

					setLoader(false)
					break;
				case 'signIn_failure':
					setLoader(false)
				case 'cognitoHostedUI_failure':
					setLoader(false)
					console.log('Sign in failure', data);

			}
		});

		// getAuthUser().then(userData => setUser(userData));
	}, []);

	// _uploadUserInfo = async (info) => {
		// dispatch({type:"SET_USER_INFORMATION",payload:info})//set full info by cognito in context api
		// let identities = JSON.parse(info.attributes.identities);
		// const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: identities[0].providerName, dateCreated: identities[0].dateCreated, joinedByPlatform: "Mobile" };
		// const userResult = await UploadUser(req);
		// if (userResult.success == true) {
		// 	setUser({ ...info.attributes, socialAuthID: info.username}).then((result) => {
		// 		console.log("setuser result", result)
		// 		if (result == 'PASS') {
		// 			navigation.navigate("Home");
		// 		}
		// 	})
		// }
		// else {
		// 	console.log("Something went wrong _uploadUserInfo login screen")
		// 	alert("Something went wrong")
		// }
	// }
	// function getAuthUser() {
	// 	return Auth.currentAuthenticatedUser()
	// 		.then(userData => userData)
	// 		.catch(() => console.log('Not signed in login'));
	// }
	// const storeData = async (value) => {
	// 	try {
	// 		const jsonValue = JSON.stringify(value)
	// 		await AsyncStorage.setItem('@USERINFO', jsonValue);
	// 		navigation.navigate('Home');
	// 	} catch (e) {
	// 		// saving error
	// 	}
	// }
	return (
		<Container>
			<Header {...navigation} backtext={'Sign In'} centerTitle='' />
			<Content>
				{
					(loader)
						?
						(<ActivityIndicator visible={loader} />)
						:
						(null)
				}
				<>
					<PageTitleWrapper>
						<PageTitle>Sign In to Edout Learning </PageTitle>
					</PageTitleWrapper>
					<FormContainer>
						<Username>
							<TextInput
								style={{ borderColor: '#9AA1B0', borderWidth: 0.5 }}
								placeholder="Enter email"
								placeholderTextColor={'#9AA1B0'} placeholderStyle={{ left: 20 }}
								onChangeText={text => onChangeEmail(text)}
								value={email}
							/>
						</Username>
						<Password>
							<TextInput
								style={{ borderColor: '#9AA1B0', borderWidth: 0.5 }}
								placeholder="Password"
								placeholderTextColor={'#9AA1B0'}
								secureTextEntry={true}
								onChangeText={text => onChangePassword(text)}
								value={password}
							/>
						</Password>
						<Forget onPress={() => navigation.navigate('ResetAccount')}>
							{/* <ForgetText>Forgot Password?</ForgetText> */}
						</Forget>

						<Button onClick={go} text={verfyBtnTxt} textColor="white" backgroundColor={submitDisbaled == true ? "rgb(159, 159, 159)" : commonStyle.themeColor()} disabled={submitDisbaled} />

						<OrContainer>
							<OrText>Or</OrText>
						</OrContainer>

						<SocialConatiner>
							<Facebook onPress={() => Auth.federatedSignIn({ provider: 'Facebook' })}>
								<Image source={require('../../assets/images/facebook.png')} />
							</Facebook >
							<Amazon onPress={() => Auth.federatedSignIn({ provider: 'LoginWithAmazon' })}>
								<AmazonImage source={require('../../assets/images/amazon.png')} />
							</Amazon>
							<Apple onPress={() => Auth.federatedSignIn({ provider: 'SignInWithApple' })}>
								<AppleImage source={require('../../assets/images/apple.png')} />
							</Apple>
							<Google onPress={() => Auth.federatedSignIn({ provider: 'Google' })}>
								<Image source={require('../../assets/images/google.png')} />
							</Google>
						</SocialConatiner>
					</FormContainer>
				</>
			</Content>
		</Container>
	)
}
export default Login;

