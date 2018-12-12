import { StyleSheet } from 'react-native';
import colors from '@styles/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.mainTextColor,
    marginBottom: 4,
  },
  monthView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  monthViewAndroid: {
    justifyContent: 'center',
  },
  monthText: {
    fontSize: 18,
    fontWeight: '500',
  },
  weekdayView: {
    alignItems: 'center',
  },
  weekdayText: {
    opacity: 0.9,
  },
  dayView: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 25,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekdaysInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  arrowIcon: {
    width: 23,
    height: 23,
  },
  arrowIconSmall: {
    width: 20,
    height: 20,
  },
  arrowStyle: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthArrowStyle: {
    flex: 1,
    alignItems: 'flex-start',
    width: 18,
    height: 18,
    paddingHorizontal: 10,
    opacity: 0,
  },
  monthArrowStyleLeft: {
    alignItems: 'flex-end',
  },
  chosenDay: {
    backgroundColor: colors.switch,
    borderRadius: 50,
    height: 25,
    width: 25,
  },
  currentDay: {
    fontWeight: '500',
    opacity: 1,
  },
  flippedButton: {
    transform: [{ scaleX: -1 }],
  },
});
