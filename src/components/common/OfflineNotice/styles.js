import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    zIndex: 99,
  },
  offlineContainer: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    backgroundColor: '#b52424',
    top: 60,
  },
  offlineText: {
    color: '#fff',
  },
});
