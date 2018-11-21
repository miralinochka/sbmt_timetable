import { StyleSheet } from 'react-native';
import generalStyles from '@styles/general';

export default StyleSheet.create({
  container: {
    ...generalStyles.fullSize,
    ...generalStyles.defaultPaddingHorizontal,
  },
  сontainerItem: {
    marginVertical: 3,
    borderRadius: 10,
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
    color: 'red',
    textAlign: 'left',
  },
  inputMessage: {
    minHeight: 150,
    textAlignVertical: 'top',
  },
});
