import * as commonStyle from '../../includes/main-style';
import styled from "styled-components";

export const Container = styled.View`
	flex:1
`;

export const Content = styled.View`
    flex:1
    paddingLeft : ${commonStyle.getModerateScale(20)}px;
    paddingRight : ${commonStyle.getModerateScale(20)}px;
    paddingTop : ${commonStyle.getModerateScale(20)}px;
`;

export const Saperate = styled.View`
    height : 50
`;

export const AddPhotosWrapper = styled.View`
    flex:0.2
`;

export const ScrollView = styled.ScrollView`
    flex:0.6
    height:auto
`;

export const TextAddPhoto = styled.Text`
    fontSize : ${commonStyle.getModerateScale(20)}
    fontWeight : 600
`;

export const PhotoContainer = styled.TouchableOpacity`
    height : ${commonStyle.getResponsiveScreenHeight(10)}
    width : ${commonStyle.getResponsiveScreenHeight(10)}
    justifyContent : center
    alignItems : center
    borderWidth:3
    borderStyle: dashed
    borderColor: #999999
    borderRadius: 1
    marginTop : ${commonStyle.getModerateScale(14)}
`;

export const ImageAdd = styled.Image``;

export const ListPhotosWrapper = styled.View`
    height : ${commonStyle.getResponsiveScreenHeight(24)}
    width : 100%
    flex: 1
    marginTop : 10
`;

export const LocationImage = styled.Image`
    flex: 1
    width:100%
    height: 100%
    borderColor: ${commonStyle.themeColor()}
    borderWidth : 0.6
    borderRadius : 12
    
    
`;

export const GoBackView = styled.View`
    justifyContent : center
    padding : ${commonStyle.getModerateScale(16)}px
`;

export const TouchableOpacityBack = styled.TouchableOpacity`

    flexDirection : row
    justifyContent : center
    alignItems : center
    
`;

export const ArrowImage = styled.Image`
    alignSelf : center
`;

export const BackText = styled.Text`
    alignSelf : center
    color : #9AA1B0
    fontSize : ${commonStyle.getModerateScale(16)}px
    fontWeight : 600
`;

export const ViewOne = styled.View`
    height : auto
    position : absolute
    bottom : 5
    right : 0
    left : 0
    flex:0.2
`;

export const ViewTwo = styled.View`
    
    alignSelf: center
`;
export const ActionSheetContainer = styled.View`
  padding:10px
  margin:10px
  shadowColor: #000
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
`;
export const Option = styled.TouchableOpacity`
    justifyContent: center
    flexDirection: row
    alignItems: center
    padding: ${commonStyle.getModerateScale(13)}px
`;
export const Optiontext = styled.Text`
    fontSize: ${commonStyle.getModerateScale(20)}px
    color : ${commonStyle.themeColor()}
`;
export const OptionCanceltext = styled.Text`
    fontSize: ${commonStyle.getModerateScale(20)}px
    color : red
`;

export const Saperater = styled.View`
    height : 0.6
    backgroundColor : gray
`;

