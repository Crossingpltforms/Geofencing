import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';
export const Container = styled.View`
    flex: 1
    backgroundColor: white
`;

export const TitleContainer = styled.View``;

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
    marginTop : 10
    justifyContent : space-around
    
`;
export const Add = styled.View``;

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