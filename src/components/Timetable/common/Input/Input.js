import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';

const Input = ({ value, onChangeText, placeholder }) => (
  <View style={styles.container}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
    />
  </View>
);

export default Input;
