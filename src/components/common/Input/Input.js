import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import generalStyles from '@styles/general';
import styles from './styles';

const Input = ({
  onChangeText, placeholder, multiline, styled, value,
}) => (
  <View style={generalStyles.fullSize}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, styled]}
      multiline={multiline}
      value={value}
    />
  </View>
);

Input.defaultProps = {
  multiline: false,
  value: undefined,
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  value: PropTypes.string,
};

export default Input;
