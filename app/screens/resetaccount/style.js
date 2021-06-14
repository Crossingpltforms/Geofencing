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

export const LogoContainer = styled.View`
	flex:0.6
	justifyContent : center
`;
export const TextForgot = styled.Text`
	
`;
export const TextOne = styled.Text`

`;
export const TextTwo = styled.Text`

`;

export const FormContainer = styled.View`
	flex:0.4
	alignItems : center
`;

export const LogoImage = styled.Image`
	height : ${commonStyle.getModerateScale(150)}px
	width : ${commonStyle.getModerateScale(200)}px
	alignSelf : center
`;

export const PageTitle = styled.Text`
	color : white
	fontSize : ${commonStyle.getModerateScale(14)}px
	fontWeight : bold
`;

export const View = styled.View`
	flexDirection: row
	justifyContent: center
	alignItems: center
	backgroundColor: #fff
	borderColor: #000
	height : ${commonStyle.getModerateScale(40)}px
	margin: 20px
`;

export const TextInput = styled.TextInput`
	flex: 0.9
	fontSize : ${commonStyle.getModerateScale(10)}px
`;
export const OrContainer = styled.View`
	justifyContent : center
	alignItems : center
	padding : ${commonStyle.getModerateScale(12)}px
`;
export const OrText = styled.Text`
	color : white
	fontSize : ${commonStyle.getModerateScale(12)}px;
	fontWeight : bold
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
	marginTop : 10px
`;
export const Facebook = styled.TouchableOpacity``;
export const Google=styled.TouchableOpacity``;
export const Amazon=styled.TouchableOpacity``;
export const Apple=styled.TouchableOpacity``;
export const AlreadyContainer=styled.View`
	flexDirection : row
	position : absolute
	bottom : ${commonStyle.getModerateScale(13)}px
	justifyContent : center
	alignItems : center
`;
export const AlText=styled.Text`
	color : white
	fontSize : ${commonStyle.getModerateScale(14)}px;
`;
export const TouchableOpacity=styled.TouchableOpacity`
	color : white
	fontSize : ${commonStyle.getModerateScale(18)}px;
	fontWeight : bold
`;
export const InText=styled.Text`
	color : white
	fontSize : ${commonStyle.getModerateScale(18)}px;
	fontWeight : bold
	
`;
