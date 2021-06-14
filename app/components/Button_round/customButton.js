import React from 'react';
import {ButtonContainer, ButtonText} from './customButton-style'
const CustomButton = props => (
	<ButtonContainer
		onPress={props.onClick}
		backgroundColor={props.backgroundColor}
		disabled={props.disabled}
	>
		<ButtonText textColor={props.textColor}>{props.text}{props.disabled}</ButtonText>
	</ButtonContainer>
);
export default CustomButton;
