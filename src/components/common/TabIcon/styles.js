import { StyleSheet } from 'react-native';
import generalStyles from '@styles/general';

export default StyleSheet.create({
  iconBackground: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 4,
    padding: 20,
    ...generalStyles.defaultPaddingVertical,
  },

});
