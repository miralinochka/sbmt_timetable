import { StyleSheet } from 'react-native';
import colors from '../../../../colors';

export default StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
    paddingLeft: 15,
    color: colors.subtitle,
  },
  container: {
    flexDirection: 'column',
  },
});
