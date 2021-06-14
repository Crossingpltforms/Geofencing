import styled from 'styled-components';
import {getResponsiveScreenHeight, getModerateScale} from '../../includes/main-style';
export const ButtonContainer = styled.TouchableOpacity`
	height: ${getModerateScale(35)}
	border-radius: ${getResponsiveScreenHeight(1)}
	background-color: ${props => props.backgroundColor};
	justify-content : center
	align-items : center
	paddingRight : 10%
	paddingLeft : 10%
 	shadowColor: rgba(0, 0, 0, 0.2)
    shadowOpacity: 1.5
    elevation: 8
    shadowRadius: 8
`;
export const ButtonText = styled.Text`
	fontSize: ${getModerateScale(12)}
	color: ${props => props.textColor};
	text-align: center;
	alignSelf: center;
	
`;