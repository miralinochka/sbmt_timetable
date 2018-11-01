import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    flexDirection: 'column',
    paddingHorizontal: 15,
  },
  containerMainPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 22,
  },
  containerTime: {
    width: '17%',
  },
  subject: {
    fontSize: 15,
    fontWeight: '600',
  },
  place: {
    fontSize: 13,
    color: colors.subtitle,
  },
  lecturer: {
    fontSize: 11,
    textAlign: 'right',
    color: colors.subtitle,
  },
  rectangle: {
    backgroundColor: colors.practiseColor,
    width: 10,
    height: '100%',
    marginHorizontal: 10,
  },
  containerLecturer: {
    flex: 1,
  },
});
