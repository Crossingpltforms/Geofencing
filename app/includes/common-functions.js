import {Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Amplify, { Auth, Hub } from 'aws-amplify';
import awsconfig from '../../aws-exports';
Amplify.configure({
    ...awsconfig,
    oauth: {
        ...awsconfig.oauth,
    },
});


//get user session(aws cognito)
export const getUser = async() => {
    return Auth.currentAuthenticatedUser()
    .then(userData => {
        return userData
    })
    .catch((err) => console.log('Not signed in getuser method', err));
}

//set user session(aws cognito)
export const setUser = async(userattributes) => {
    console.log("----userattributes",userattributes)
    try {
        const jsonValue = JSON.stringify(userattributes)
        // import {CurriculamContext}  from '../../../context/Curriculam'
        await AsyncStorage.setItem('@LoggedInUserInfo', jsonValue)
        return 'PASS';
    } catch (e) {
        return 'FAILED';
        console.log("error in setting up LoggedInUserInfo asyncstorage=", e)
    }
}

//get any session just based on key passed
export const GetSession = async (key) => {
    try {
        let getData = await AsyncStorage.getItem(key);
        getData = JSON.parse(getData)
        return getData;
    }
    catch (error) {
        console.log("Something went wrong with getSession AsyncStorage", error);
    }
};

// import common functon example to show warning toast etc
export const WarningToast = async (message) => {
    // do your logic
    Alert.alert(message)
};


//////////////////////////////////////////////////



// All async storage keys will go here
export const SetUserSession = async (userId, token) => {
    const USER = {
        userId: userId,
        userToken: token
    }
    try {
        await AsyncStorage.setItem('@USER', JSON.stringify(USER));
        return "ok";
    } catch (e) {
        return "no";
        console.log("error in user asyncstorage", error);
    }
};



//destroy session just based on key passed
export const LogoutSession = async (key) => {
    AsyncStorage.getAllKeys()
        .then(keys => {
            console.log(keys);
            AsyncStorage.multiRemove(keys)
        })
        .then(() => {
        })
        .catch((err) => { console.log("err in logout function", err); })
};


