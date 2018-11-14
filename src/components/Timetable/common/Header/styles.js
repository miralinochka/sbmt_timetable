import { StyleSheet } from 'react-native';
import colors from '@src/colors';

export default StyleSheet.create({
  safeArea: {
    backgroundColor: colors.mainColor,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  view: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  headerTextView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  leftButton: {
    marginLeft: 15,
    marginRight: 7,
  },
  rightButton: {
    marginRight: 15,
    marginLeft: 7,
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
    top: '120%',
    left: '5%',
  },
});
