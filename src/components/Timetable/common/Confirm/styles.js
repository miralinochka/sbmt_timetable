import { StyleSheet } from 'react-native';

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
    lineHeight: 130,
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.55)',
    position: 'relative',
    padding: 15,
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
    padding: 15,
  },
});
