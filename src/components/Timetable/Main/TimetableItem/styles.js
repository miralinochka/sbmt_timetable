import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    flexDirection: 'column',
  },
  containerMainPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 22,
  },
  subject: {
    fontSize: 15,
  },
  place: {
    fontSize: 13,
    color: colors.subtitle
  }, 
  lecturer: {
    fontSize: 12,
    textAlign: 'right',
    color: colors.subtitle
  },  
  rectangle: {
    backgroundColor: colors.lecture,
    width: 10,
    height: '100%',
    marginHorizontal: 10,
  },
})