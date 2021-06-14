import React from 'react';
// import {WrapperActivityIndicator, ActivityIndicator} from './style'
import Spinner from 'react-native-loading-spinner-overlay';

const SpinnerComponent = props => (
	<Spinner visible={props.visible} animation ={'fade'}/>
);
export default SpinnerComponent;