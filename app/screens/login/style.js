import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';

export const Container = styled.View`
	flex:1
`;
export const Content = styled.View`
	{/*backgroundColor : gray*/}
	flex:1
	padding : 20px
	background : white
`;
export const PageTitleWrapper = styled.View`
	justifyContent : center
	alignContent : center
	padding : ${commonStyle.getModerateScale(13)}px;
	
`;
export const PageTitle = styled.Text`
	color : ${commonStyle.themeColor()}
	alignSelf : center
	fontWeight : bold
	fontSize : ${commonStyle.getModerateScale(20)}px;
`;
export const FormContainer = styled.View`
	justifyContent : center
	
`;
export const Username = styled.View`
	alignSelf : center 
	width : 100%
	marginTop : ${commonStyle.getModerateScale(25)}px
`;
export const Password = styled.View`
	alignSelf : center 
	width : 100%
	marginTop : ${commonStyle.getModerateScale(25)}px
`;
export const Forget = styled.TouchableOpacity`
	alignItems : flex-end
	alignSelf : flex-end
	width : auto
	paddingLeft : ${commonStyle.getModerateScale(19)}px;
	paddingTop : ${commonStyle.getModerateScale(19)}px;
	paddingBottom : ${commonStyle.getModerateScale(19)}px;
	
`;
export const ForgetText = styled.Text`
	color : #4086F4
	fontSize : ${commonStyle.getModerateScale(14)}px;
	fontWeight: bold
`;
export const TextInput = styled.TextInput`
	background : white
	height : ${commonStyle.getModerateScale(35)}px
	border-radius: 5px;
	borderColor: #9AA1B0; borderWidth: 1
	color : rgb(56, 56, 56)
	fontSize: ${commonStyle.getModerateScale(12)}px
	width : 100%
	align-self : center

	justifyContent : center
	alignItems : center
	paddingLeft:10px
`;
export const OrContainer = styled.View`
	justifyContent : center
	alignItems : center
	padding : ${commonStyle.getModerateScale(30)}px
`;
export const OrText = styled.Text`
	color : #9AA1B0
	fontWeight : bold
	fontSize : ${commonStyle.getModerateScale(12)}px;
`;
export const Image=styled.Image`
	marginHorizontal : ${commonStyle.getModerateScale(3)}%;
	height : ${commonStyle.getModerateScale(30)}px
	width : ${commonStyle.getModerateScale(30)}px
	
`;
export const AmazonImage=styled.Image`
	marginHorizontal : ${commonStyle.getModerateScale(3)}%;
	height : ${commonStyle.getModerateScale(40)}px
	width : ${commonStyle.getModerateScale(40)}px
`;
export const AppleImage=styled.Image`
	marginHorizontal : ${commonStyle.getModerateScale(3)}%;
	height : ${commonStyle.getModerateScale(35)}px
	width : ${commonStyle.getModerateScale(35)}px
`;
export const SocialConatiner=styled.View`
	flexDirection : row
	justifyContent : center
	alignSelf:center
`;
export const Facebook = styled.TouchableOpacity``;
export const Google=styled.TouchableOpacity``;
export const Amazon=styled.TouchableOpacity``;
export const Apple=styled.TouchableOpacity``;

