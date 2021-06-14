import styled from 'styled-components';
import {getResponsiveScreenHeightDivide, getModerateScale, getPlatform} from '../../includes/main-style';
export const WrapperActivityIndicator = styled.View`
	display: flex
    alignItems: center
    justifyContent: center
    alignSelf: center
    /*backgroundColor: #FFFFFF*/
    height: ${getModerateScale(170)}
    width: ${getModerateScale(170)}
    /*borderRadius: 10*/
    position:absolute
    marginTop : ${getPlatform() == "android" ? getResponsiveScreenHeightDivide(5) : getResponsiveScreenHeightDivide(5)}
`;
export const ActivityIndicator = styled.ActivityIndicator`
    alignSelf:center
`;