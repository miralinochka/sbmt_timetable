import { StyleSheet } from 'react-native';
import colors from '../../../colors'

export default StyleSheet.create({
  container: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  title: {
    color: colors.mainTextColor,
    fontSize: 20,
  }
});
