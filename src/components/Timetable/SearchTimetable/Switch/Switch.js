import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles'

const Switch = ({ toggleSearch, items, style, searchItem }) => {
	return (
    <View style={[styles.container, style]}>
      {
        items.map(item => (
          <TouchableOpacity onPress={toggleSearch} style={[styles.button, searchItem===item && styles.colored]} key={item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};
export default Switch;