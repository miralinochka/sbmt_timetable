import { StyleSheet } from 'react-native';
import colors from '@styles/colors';
import generalStyles from '@styles/general';

export default StyleSheet.create({
  container: {
    backgroundColor: colors.mainTextColor,
    ...generalStyles.defaultPaddingHorizontal,
    marginBottom: 4,
  },
  monthView: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    flexDirection: 'row',
  },
  monthText: {
    fontSize: 17,
    fontWeight: '500',
  },
  weekdayView: {
    alignItems: 'center',
  },
  weekdayText: {
    opacity: 0.9,
  },
  dayView: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    width: 25,
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  arrowIcon: {
    width: 23,
    height: 23,
  },
  currentDay: {
    backgroundColor: colors.switch,
    borderRadius: 50,
    height: 25,
    width: 25,
  },
});
