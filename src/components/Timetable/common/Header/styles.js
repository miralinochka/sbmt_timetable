import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  safeArea: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  view: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.mainTextColor,
  },
  icon: {
    width: 30,
    height: 30,
  },
  backIcon: {
    width: 25,
    height: 25,
  },
  hiddenIcon: {
    display: 'none',
  },
  groupViewStyle: {
    position: 'absolute',
    zIndex: 10,
    top: '120%',
  },
});
