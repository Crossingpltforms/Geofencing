import * as React from 'react';
import { View, Text } from 'react-native';
import {ContextProvider} from './context'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-navigation'
import Splash from './screens/splash'
import Login from './screens/login'
import Signup from './screens/signup'
import CreateNewAcc from './screens/signup/createNewAcc'
import Intro from './screens/intro'
import Home from './screens/home'
import ResetAccount from './screens/resetaccount'
import Events from './screens/events'
import Profile from './screens/profile'
import Notes from './screens/notes'
import  Network  from "./components/internet-check";
const Stack = createStackNavigator();

function intenttop() { }
function Route() {
	return (
		<NavigationContainer>
			<SafeAreaView style={{ flex: 1, backgroundColor: '#3BCB16' }}  >
				<Network/>
				<Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }} initialRouteName='Splash'>
					<Stack.Screen name="Splash" component={Splash} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Login" component={Login} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Signup" component={Signup} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="CreateNewAcc" component={CreateNewAcc} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="ResetAccount" component={ResetAccount} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Intro" component={Intro} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Home" component={Home} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Events" component={Events} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Profile" component={Profile} screenOptions={{ headerShown: false }} />
					<Stack.Screen name="Notes" component={Notes} screenOptions={{ headerShown: false }} />
				</Stack.Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
}
export default ()=>{
    return <ContextProvider>
		
        <Route />
    </ContextProvider>
}
