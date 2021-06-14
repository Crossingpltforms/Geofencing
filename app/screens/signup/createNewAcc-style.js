import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';

export const Container = styled.View`
	flex:1
`;

export const Content = styled.View`
	backgroundColor : white
	flex:1
	padding : 20px
`;

export const ImageBackground = styled.ImageBackground`
	flex:1
`;

export const FormContainer = styled.View``;

export const Heading = styled.Text`
	fontSize : ${commonStyle.getModerateScale(14)}px
`;

export const Username = styled.View`
	marginTop : ${commonStyle.getModerateScale(10)}px`
;

export const InputArea = styled.View`
	marginTop : ${commonStyle.getModerateScale(15)}px
`;

export const TextInput = styled.TextInput`
	height : ${commonStyle.getModerateScale(40)}px
	borderRadius : ${commonStyle.getModerateScale(8)}px
	borderColor: #9AA1B0
	borderWidth: 0.5
	marginTop : ${commonStyle.getModerateScale(5)}px
	paddingLeft : ${commonStyle.getModerateScale(5)}px
	fontSize : ${commonStyle.getModerateScale(12)}px
`;

export const CheckboxView = styled.View``;

export const TNC = styled.View`
	flexDirection : row
	justifyContent : center
	alignItems : center
	marginTop : 33px
`;

export const Agree = styled.Text`
	fontSize : ${commonStyle.getModerateScale(14)}px
	alignSelf : center
	marginLeft : 10px
	justifyContent : center
	alignItems : center
`;

export const ButtonView = styled.View`
	marginTop : ${commonStyle.getModerateScale(55)}px
`;

export const HyperText = styled.Text `
	alignSelf : center
	justifyContent : center
	alignItems : center
	fontSize : ${commonStyle.getModerateScale(14)}px
	top : 3px
	color : #4175DF
`;

export const HyperLink = styled.TouchableOpacity `
	alignSelf : center
	justifyContent : center
	alignItems : center
`;

export const HyperLinkCode=styled.TouchableOpacity`
	marginTop : 5px
`;

export const HyperTextCode=styled.Text`
	fontSize : ${commonStyle.getModerateScale(14)}px
	color : #4175DF
`;