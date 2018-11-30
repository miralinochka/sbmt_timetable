import React from 'react';
import {
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ActionIcon = ({
  // eslint-disable-next-line react/prop-types
  icon, onIconPress, hideIcon, backIcon, disabled, styled, testID
}) => (
  <TouchableOpacity testID={testID} onPress={disabled ? undefined : onIconPress} style={[styles.icon, styled]}>
    <Image
      style={[styles.icon, backIcon, hideIcon]}
      source={icon}
    />
  </TouchableOpacity>
);

ActionIcon.defaultProps = {
  hiddenIcon: {},
  backIcon: {},
  styled: {},
};

ActionIcon.propTypes = {
  onIconPress: PropTypes.func.isRequired,
  hiddenIcon: PropTypes.shape({}),
  backIcon: PropTypes.shape({}),
  styled: PropTypes.shape({}),
};

export default ActionIcon;
