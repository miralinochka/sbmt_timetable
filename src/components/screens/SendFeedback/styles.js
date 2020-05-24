import { StyleSheet } from 'react-native';
import generalStyles from '@styles/general';
import colors from '@styles/colors';

export default StyleSheet.create({
  container: {
    ...generalStyles.fullSize,
    ...generalStyles.defaultPaddingHorizontal,
  },
  inputIOS: {
    color: colors.text,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    lineHeight: 20,
  },
  inputAndroid: {
    color: colors.text,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    lineHeight: 20,
  },
  сontainerItem: {
    marginVertical: 3,
    borderRadius: 10,
    flexDirection: 'column',
  },
  defaultText: {
    ...generalStyles.defaultTextSize,
    textAlign: 'center',
  },
  defaultTextView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  errorView: {
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  errorText: {
    color: colors.red,
    textAlign: 'left',
  },
  inputMessage: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
});
