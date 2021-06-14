import styled from 'styled-components';
import * as commonStyle from '../../includes/main-style';
export const ActionSheetContainer = styled.View`
  padding:10px
`;
export const Option = styled.TouchableOpacity`
    justifyContent: center
    flexDirection: row
    alignItems: center
    padding: 10px
`;
export const Optiontext = styled.Text`
    fontSize: ${commonStyle.getModerateScale(20)}
    color : ${commonStyle.themeColor()}
`;
export const OptionCanceltext = styled.Text`
    fontSize: ${commonStyle.getModerateScale(20)}
    color : red
`;

export const Saperater = styled.View`
    height : 0.8
    backgroundColor : gray
`;