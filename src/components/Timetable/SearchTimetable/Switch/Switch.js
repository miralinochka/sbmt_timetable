import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const Switch = ({
  toggleSearch, items, style, searchItem,
}) => (
  <View style={[styles.container, style]}>
    <View style={[styles.innerContainer, style]}>
      {
        items.map((item, index) => (
          <TouchableOpacity onPress={toggleSearch} style={[styles.button, searchItem === item && styles.colored, index === items.length - 1 && styles.noRightBorder]} key={item}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  </View>
);
export default Switch;
