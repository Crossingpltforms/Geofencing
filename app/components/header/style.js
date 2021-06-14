import styled from 'styled-components';
import {getResponsiveScreenHeight,getPlatform,getResponsiveScreenHeightDivide,getResponsiveScreenWidthDivide, getModerateScale} from '../../includes/main-style';

export const HeaderContainer = styled.View`
	paddingTop: ${getModerateScale(15)}px
    paddingBottom: ${getModerateScale(5)}px
    borderBottomColor : #E5E5E5
    borderBottomWidth : 1px
    backgroundColor : white
`;
export const Wrapper = styled.View`
	flexDirection: row;
    
    height : 30
`;

export const LeftSection = styled.View`
	flex: 0.3; 
`;
export const BackTouch = styled.TouchableOpacity`
	flexDirection: row;
	flex: 1; 
	textAlign: center;
`;
export const BackImage = styled.Image`
    alignSelf: center
    height:${getModerateScale(12)}px
    width : ${getModerateScale(12)}px
    marginLeft : 10
`;
export const BackText = styled.Text`
    color : #3BCB16
    alignSelf: center
    fontSize: ${getModerateScale(12)}px
    left:10
    fontWeight : bold
`;
export const MiddleText = styled.Text`
    color : #616161
    alignSelf: center
    fontSize: ${getModerateScale(14)}px
`;

export const MiddleSection = styled.View`
    flex: 0.4; 
    justifyContent : center
`;
export const RightSection = styled.View`
	flex: 0.3; 
	flexDirection : row
	justifyContent : flex-end
`;

export const MiddleTextLarge = styled.Text`
    color : #000000
    alignSelf: center
    fontSize: ${getModerateScale(20)}px
    
`;
