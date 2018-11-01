import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const Input = ({ onChangeText, placeholder }) => (
  <View style={styles.container}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={styles.input}
    />
  </View>
);

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
