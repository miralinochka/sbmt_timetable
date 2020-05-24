import { StyleSheet } from 'react-native';
import colors from '@styles/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: colors.borderColor,
    backgroundColor: 'white',
    borderBottomWidth: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
});
