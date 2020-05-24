import React from 'react';
import { TextInput, View } from 'react-native';
import PropTypes from 'prop-types';
import generalStyles from '@styles/general';
import styles from './styles';
import colors from '@styles/colors';

const Input = ({
  onChangeText, placeholder, multiline, styled, value, testID, textContentType,
}) => (
  <View style={generalStyles.fullSize}>
    <TextInput
      autoCorrect={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, styled]}
      multiline={multiline}
      value={value}
      testID={testID}
      placeholderTextColor={colors.placeholderColor}
      textContentType={textContentType}
    />
  </View>
);

Input.defaultProps = {
  multiline: false,
  value: undefined,
  textContentType: undefined,
};

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  value: PropTypes.string,
  testID: PropTypes.string.isRequired,
  textContentType: PropTypes.string,
};

export default Input;
