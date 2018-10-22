import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles'

const Switcher = ({ toggleSearch, item1, item2 }) => {
	return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleSearch} style={styles.button}>
        <Text>{item1}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={toggleSearch} style={styles.button}>
        <Text>{item2}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Switcher;