import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';
export const ActionSheetConatiner = styled.View`
    height : auto
    padding: ${commonStyle.getModerateScale(18)}px
`;

export const FormContainer = styled.View``;

export const InputArea = styled.View``;

export const InputAreaPlace = styled.View`top:8`;

export const InputLebal = styled.Text`
    color: #616161
    fontWeight : 600
    fontSize : ${commonStyle.getModerateScale(18)}
`;

export const TextInput = styled.TextInput`
    borderWidth : 1
    borderColor : #9AA1B0
    height : ${commonStyle.getModerateScale(35)}px
    padding : ${commonStyle.getModerateScale(10)}px
    color : white
    fontWeight : 500
    backgroundColor : ${commonStyle.themeColor()}
`;

export const ImageContainer = styled.View`
    justifyContent : center
    alignItems : center
`;
export const ImageContainerSmall = styled.View`
    flexDirection : row
    alignSelf : center
    justifyContent : center
    alignItems : center
    backgroundColor : rgba(65, 117, 223, 0.1)
    marginTop : ${commonStyle.getModerateScale(15)}px
    padding:${commonStyle.getModerateScale(8)}px
    paddingBottom:${commonStyle.getModerateScale(12)}px
`;
export const ImageAndTitle = styled.TouchableOpacity``;
export const Image = styled.Image`
    alignSelf : center
    height : ${commonStyle.getResponsiveScreenHeight(4)}px
    width : ${commonStyle.getResponsiveScreenHeight(4)}px
`;

export const ImagePhotos = styled.Image`
    alignSelf : center
    height : ${commonStyle.getResponsiveScreenHeight(5.2)}px
    width : ${commonStyle.getResponsiveScreenHeight(5.2)}px
    top : ${commonStyle.getModerateScale(3)}px
`;
export const ImageTitle = styled.Text`
    alignSelf : center
    color : #616161
    fontWeight : 600
    fontSize : ${commonStyle.getModerateScale(11)}
    top : ${commonStyle.getModerateScale(10)}px
`;
export const ImagePhotoTitle = styled.Text`
    alignSelf : center
    color : #616161
    fontWeight : 600
    fontSize : ${commonStyle.getModerateScale(11)}
    top : ${commonStyle.getModerateScale(6)}px
`;

export const AndText = styled.Text`
    alignSelf : center
    color : #616161
    fontWeight : 600
    fontSize : ${commonStyle.getModerateScale(11)}
`;
export const TimeStampContainer = styled.View``;
export const SaveTouchableOpacity = styled.TouchableOpacity`
    padding:${commonStyle.getModerateScale(11)}px
    alignSelf : center
    marginTop : ${commonStyle.getModerateScale(10)}px
`;
export const SaveText = styled.Text`
    alignSelf : center
    fontWeight : 600
    color : blue
`;