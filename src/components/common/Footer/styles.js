import { StyleSheet } from 'react-native';
import colors from '@styles/colors';

export default StyleSheet.create({
  viewStyle: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    height: 60,
  },
});
