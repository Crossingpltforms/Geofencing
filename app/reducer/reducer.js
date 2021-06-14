export const initalState = {
    userInformation : [], //cognito user information
    fullLocation : [], //full locations
    singleLocation : [], //single locations
    notes : [], //single location's notes
    network : null, //single location's notes
}

export const reducer = (state = initialState,action)=>{
    // console.log("-----------",state)
    switch(action.type){
        case "SET_USER_INFORMATION":
            return Object.assign({}, state, {
                userInformation: action.payload
            });
        case "SET_FULL_LOCATION":
            return Object.assign({}, state, {
                fullLocation: action.payload
            });
        case "SET_SINGLE_LOCATION":
            return Object.assign({}, state, {
                singleLocation: action.payload
            });
        case "SET_NOTES":
            return Object.assign({}, state, {
                notes: action.payload
            });
        case "SET_NETWORK":
            return Object.assign({}, state, {
                network: action.payload
            });
        default:
            return state
   }
}