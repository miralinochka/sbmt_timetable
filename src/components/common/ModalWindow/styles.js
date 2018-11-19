import { StyleSheet } from 'react-native';
import generalStyles from '@styles/general';

export default StyleSheet.create({
  cardItem: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0,
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    padding: 30,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    position: 'relative',
    ...generalStyles.defaultPaddingVertical,
    ...generalStyles.defaultPaddingHorizontal,
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  iconStyle: {
    width: '100%',
    height: 'auto',
    ...generalStyles.defaultPaddingVertical,
    ...generalStyles.defaultPaddingHorizontal,
  },
});
