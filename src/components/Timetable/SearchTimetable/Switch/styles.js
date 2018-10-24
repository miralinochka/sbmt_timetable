import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: colors.mainTextColor,
  },
  colored: {
    backgroundColor: colors.switch,
  },
  text: {
    fontSize: 15,
  }
})