import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';
import { exp } from 'react-native/Libraries/Animated/src/Easing';
export const Container = styled.View`
    flex: 1
    backgroundColor: white
`;
export const TitleContainer = styled.View`
    
`;
export const Title = styled.Text`
    fontSize : ${commonStyle.getModerateScale(24)}px
    color : #3A3A3A
    fontWeight : bold
`;
export const SubTitle = styled.Text`
    fontSize : ${commonStyle.getModerateScale(16)}px
    color : #000000
    fontWeight : 300
    marginTop : ${commonStyle.getModerateScale(4)}px
`;
export const ScrollViewContent = styled.ScrollView``;
export const NoteContainer = styled.View`
    marginTop : ${commonStyle.getModerateScale(24)}px
`;
export const AddNote = styled.Text`
    fontSize : ${commonStyle.getModerateScale(16)}px
    color : #3A3A3A
    fontWeight : 500
`;
export const Textarea = styled.TextInput`
    borderColor: #9AA1B0
    borderWidth : 0.9
    padding :  ${commonStyle.getModerateScale(10)}px
    marginTop : ${commonStyle.getModerateScale(10)}px
    height : ${commonStyle.getModerateScale(100)}px
`;

export const ButtonContainer = styled.View`
    flexDirection : row
    marginTop : ${commonStyle.getModerateScale(10)}px
    justifyContent : space-evenly
`;

export const Add = styled.View``;

export const CheckBoxContainer = styled.View`
    flexDirection : row
    marginLeft : ${commonStyle.getModerateScale(1)}px
    marginTop : ${commonStyle.getModerateScale(10)}px
`;
export const AddCheckBoxText = styled.Text`
    left : ${commonStyle.getModerateScale(10)}px
    fontSize : ${commonStyle.getModerateScale(14)}px
    alignSelf : center
`;
export const CheckboxSubtitle = styled.Text`
    left : ${commonStyle.getModerateScale(10)}px
    fontSize : ${commonStyle.getModerateScale(8)}px
    alignSelf : center
`;
export const Delete = styled.View``;
export const Update = styled.View``;

export const TouchableOpacity = styled.TouchableOpacity`
    flexDirection : row
    padding : ${commonStyle.getModerateScale(5)}px
    justifyContent : center
    alignItems : center
    borderColor : #E5E5E5
    borderWidth : 1
    borderRadius : 10
`;
export const ButtonText = styled.Text`
    marginLeft : ${commonStyle.getModerateScale(10)}px
    fontSize : ${commonStyle.getModerateScale(20)}px
    color : #9AA1B0
    fontWeight : 600
`;
export const ListView = styled.View`
    marginTop :${commonStyle.getModerateScale(10)}px
`;
export const GoBackView = styled.View`
    justifyContent : center
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

export const PaginContainer=styled.View`
    flexDirection : row
    justifyContent : center
    alignItems : center
`;

export const Pagenumber=styled.Text`
    fontSize : ${commonStyle.getModerateScale(12)}px
    fontWeight : bold
`;

export const LeftButtonPagin=styled.TouchableOpacity`
    paddingRight : ${commonStyle.getModerateScale(12)}px
    paddingLeft : ${commonStyle.getModerateScale(12)}px
    paddingTop : ${commonStyle.getModerateScale(4)}px
    paddingBottom : ${commonStyle.getModerateScale(4)}px
    justifyContent : center
`;
export const RightButtonPagin=styled.TouchableOpacity`
    paddingRight : ${commonStyle.getModerateScale(12)}px
    paddingLeft : ${commonStyle.getModerateScale(12)}px
    paddingTop : ${commonStyle.getModerateScale(4)}px
    paddingBottom : ${commonStyle.getModerateScale(4)}px
    justifyContent : center
`;
export const ContainerAuthor = styled.View`
    marginTop : ${commonStyle.getModerateScale(3)}px
`;
export const ContainerAuthorName = styled.Text`
    fontSize : ${commonStyle.getModerateScale(12)}px
    color : #000000
    fontWeight : 400
`;
export const ContainerAuthorDate = styled.Text`
    marginTop : ${commonStyle.getModerateScale(3)}px
    fontSize : ${commonStyle.getModerateScale(12)}px
    color : #000000
    fontWeight : 400
`;