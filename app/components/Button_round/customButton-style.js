import styled from 'styled-components';
import {getResponsiveScreenHeight, getModerateScale} from '../../includes/main-style';
export const ButtonContainer = styled.TouchableOpacity`
	height: ${getModerateScale(35)}
	border-radius: ${getResponsiveScreenHeight(4)}
	background-color: ${props => props.backgroundColor};
	justify-content : center
	align-items : center
	paddingRight : 14%
	paddingLeft : 14%
 	shadowColor: rgba(0, 0, 0, 0.2)
    shadowOpacity: 1.5
    elevation: 8
    shadowRadius: 8
`;
export const ButtonText = styled.Text`
	fontSize: ${getModerateScale(14)}
	color: ${props => props.textColor};
	text-align: center;
	alignSelf: center;
	fontWeight : 600
	
`;