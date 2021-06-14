import React, { useState } from 'react'
import { Linking } from "react-native";
import { LogoContainer, FormContainer, Container, ImageBackground, LogoImage, PageTitle, View, TextInput, OrText, OrContainer, Facebook, Google, Apple, Amazon, Image, SocialConatiner, AmazonImage, AppleImage, AlreadyContainer, AlText, InText, TouchableOpacity, TextForgot, TextOne, TextTwo } from "./style";
import Icon from 'react-native-vector-icons/dist/FontAwesome';
Icon.loadFont()
import Amplify, { Auth, Hub } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import awsconfig from '../../../aws-exports';
import { SignedOutMessage } from 'aws-amplify-react-native/dist/AmplifyUI';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityIndicator from '../../components/Activity-Indicator';

const Signup = ({ route, navigation }) => {
	const [user, setUser] = useState(null);
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
			Linking.openURL(newUrl);
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
		Hub.listen('auth', ({ payload: { event, data } }) => {
			console.log("event", event)
			switch (event) {
				case 'signIn':
				case 'cognitoHostedUI':
					getUser().then((userData) => {
						setLoader(false)
						console.log("after signup userData",userData);
						// setUser(userData)
						// storeData(userData.attributes)
						navigation.navigate('Home');
					});
					break;
				case 'signOut':
					setUser(null);
					break;
				case 'signIn_failure':
					setLoader(false)
					alert("Something went wrong, please try again")
				case 'cognitoHostedUI_failure':
					setLoader(false)
					console.log('Sign in failure', data);
					break;
			}
		});

		// getUser().then(userData => { 
		// 	setUser(userData); 
		// 	/////Set Asyn-storgae and navigate to login
		// });
	}, []);

	const storeData = async (value) => {
		try {
			const jsonValue = JSON.stringify(value)
			await AsyncStorage.setItem('@USERINFO', jsonValue);
			navigation.navigate('Home',{userinfo : jsonValue});
		} catch (e) {
			console.log("signup session err=>",e)
			// saving error
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
								<TextForgot>Forgot password</TextForgot>
								<TextOne>No worries</TextOne>
								<TextTwo>We will send the password reset email to your address</TextTwo>
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
									<Apple onPress={() => Auth.federatedSignIn({ provider: 'Apple' })}>
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

