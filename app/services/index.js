// import {Getapi, GetApiCurriculams, GetVimeoElement, serviceProgression} from '../../includes/services/get-services';
// import {PostapiBearerToken} from '../../includes/services/post-service';
// import moment from 'moment';
import { app } from '../includes/global.config';

//Fetch all locations from DB
export const GetAllLocations = async (currectUser) => {
    try {
        let response = await fetch(
            `${app.AUTH_BASE_URL_DEV}/locations`
        );
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in GetAllLocations", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

//Fetch single locations from DB
export const getSingleLocationData = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/getSingleLocation`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api getSingleLocationData api=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

//Add user to Dynamo
export const UploadUser = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/users`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api UploadUser=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// Add New Location to Dynamo
export const AddNewLocation = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/locations`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddNewLocation=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// Add  Location photos to Dynamo
export const AddLocationPhoto = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/locationsPhoto`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddNewLocation photo=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// Add  Location Notes to Dynamo
export const AddLocationNotes = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/notes`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddLocationNotes photo=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};
// Delete  Location Notes to Dynamo
export const DeleteLocationNotes = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/notes`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddLocationNotes photo=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// Delete  Location Private Notes to Dynamo
export const DeleteLocationPrivateNotes = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/privatenotes`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddLocationNotes photo=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// Update  Location Notes to Dynamo
export const UpdateLocationNotes = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/updatenotes`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        console.error("error in post api AddLocationNotes photo=>", error);
        let json = {success : false,"message" : "Something went wrong"};
        return json;
    }
};

// GET USER PROFILE
export const getProfile = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/getUser`,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        // alert("Something went wrong")
        let json = {success : false,"message" : "Something went wrong"};
        console.error("error in post api AddLocationNotes photo=>", error);
        return json;
        
    }
};

// GET USER PROFILE
export const updateProfile = async (request) => {
    try {
        let response = await fetch(`${app.AUTH_BASE_URL_DEV}/users`,
            {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });
        let json = await response.json();
        return json;
    } catch (error) {
        alert("Something went wrong")
        console.error("error in post api AddLocationNotes photo=>", error);
    }
};


