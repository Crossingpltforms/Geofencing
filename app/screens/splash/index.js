import React, { useEffect, useContext } from 'react'
import { Container, Image } from "./style";
import { getUser, setUser } from "../../includes/common-functions";
import {EdoutContext}  from '../../context/index'

const Splash = ({ route, navigation }) => {
    const {state,dispatch} = useContext(EdoutContext)
    React.useEffect(() => {
        setTimeout(async () => {
            const userData = getUser().then((res) => {
                if (res) {
                    console.log("splash userData", "===>", res.attributes)
                        dispatch({type:"SET_USER_INFORMATION",payload:res})//set full info by cognito in context api
                        navigation.navigate("Home");
                }
                else {
                    navigation.navigate("Intro");
                }
            }).catch((err) => console.log("error in getting user splash", err))
        }, 2000);
    }, []);

    return (
        <Container>
            <Image source={require('../../assets/images/contributortoolkit.gif')} />
        </Container>

    )
}
export default Splash;

