import React, { useState, useContext } from 'react'
import {EdoutContext}  from '../../context/index'
import { Linking } from "react-native";
import { LogoContainer, FormContainer, Container, ImageBackground, LogoImage, PageTitle, View, TextInput, OrText, OrContainer, Facebook, Google, Apple, Amazon, Image, SocialConatiner, AmazonImage, AppleImage, AlreadyContainer, AlText, InText, TouchableOpacity } from "./style";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import Amplify, { Auth, Hub } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import awsconfig from '../../../aws-exports';
import { SignedOutMessage } from 'aws-amplify-react-native/dist/AmplifyUI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicator from '../../components/Activity-Indicator';
import { UploadUser } from '../../services'
import { getUser, setUser, WarningToast as alert } from "../../includes/common-functions";

const Signup = ({ route, navigation }) => {
	const {state,dispatch} = useContext(EdoutContext)
	const [loader, setLoader] = useState(false);
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

	React.useEffect(() => {
		console.log("***********SIGNUP SCREEN***********")
		Hub.listen('auth', ({ payload: { event, data } }) => {
			console.log("event", event)
			switch (event) {
				case 'signIn':
				case 'cognitoHostedUI':
					getUser().then((userData) => {
						setLoader(false)
						console.log("after signup userData",userData);
						_uploadUserInfo(userData)
					});
					break;
				case 'signOut':
					// setUser(null);
					setLoader(false)
					break;
				case 'signIn_failure':
					setLoader(false)
					alert("Something went wrong, please try again")
				case 'cognitoHostedUI_failure':
					setLoader(false)
					console.log('Sign in failure', data);
					break;
				case 'customState_failure':
					setLoader(false)
					console.log('customState_failure', data);
					break;
			}
		});
		return () => {
			Hub.remove('auth');
		  };
	}, []);

	_uploadUserInfo=async(info)=>{
		dispatch({type:"SET_USER_INFORMATION",payload:info})//set full info by cognito in context api
		let identities = JSON.parse(info.attributes.identities);
		const req = { ...info.attributes, socialAuthID: info.username, ID: info.attributes.email, authenticatedBy: identities[0].providerName, dateCreated: identities[0].dateCreated, joinedByPlatform: "Mobile" };
		const userResult = await UploadUser(req);
		if (userResult.success == true) {
			setUser({ ...info.attributes, socialAuthID: info.username}).then((result) => {
				console.log("setuser result", result)
				if (result == 'PASS') {
					navigation.navigate("Home");
				}
			})
		}
		else {
			console.log("Something went wrong _uploadUserInfo signup screen")
			alert("Something went wrong")
		}
	}

	function getUser() {
		return Auth.currentAuthenticatedUser()
			.then(userData => userData)
			.catch(() => console.log('Not signed in'));
	}

	return (
		<Container>
			<ImageBackground source={require('../../assets/images/bg.png')}>
				{
					(loader) 
					? 
						(<ActivityIndicator visible={loader}/>)
					:
						(null)
				}
				<>
					<LogoContainer>
						<LogoImage source={require('../../assets/images/contributortoolkit.gif')}></LogoImage>
					</LogoContainer>
					<FormContainer>
						<PageTitle>Create an account to continue</PageTitle>
						<View>
							<Icon style={{ padding: 10, }} name="envelope" size={20} color='#9AA1B0' />
							<TextInput
								placeholder="Sign up With email"
								underlineColorAndroid="transparent"
								placeholderStyle={{ alignSelf: 'center', alignItems: 'center' }}
								onFocus={() => navigation.navigate('CreateNewAcc',{email:null})}
							/>
						</View>
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

						<AlreadyContainer>
							<AlText>Already a member ? </AlText>
							<TouchableOpacity onPress={() => navigation.navigate('Login')}><InText> Sign in</InText></TouchableOpacity>
						</AlreadyContainer>
					</FormContainer>
				</>
			</ImageBackground>
		</Container>
	)
}
export default Signup;

