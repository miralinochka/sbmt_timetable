import { StyleSheet } from 'react-native';
import colors from '@styles/colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  innerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.switch,
    borderRadius: 3,
    overflow: 'hidden',
  },
  button: {
    borderRightWidth: 1,
    borderColor: colors.switch,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.mainTextColor,
  },
  noRightBorder: {
    borderRightWidth: 0,
  },
  colored: {
    backgroundColor: colors.switch,
  },
  text: {
    fontSize: 15,
  },
});
