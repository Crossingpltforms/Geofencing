import * as commonStyle from '../../includes/main-style';
import styled from 'styled-components';

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