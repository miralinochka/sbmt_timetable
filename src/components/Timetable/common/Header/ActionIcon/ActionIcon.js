import React from 'react';
import {
  TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const ActionIcon = ({
  // eslint-disable-next-line react/prop-types
  icon, onIconPress, hideIcon, backIcon, disabled,
}) => (
  <TouchableOpacity onPress={disabled ? undefined : onIconPress} style={styles.icon}>
    <Image
      style={[styles.icon, backIcon, hideIcon]}
      source={icon}
    />
  </TouchableOpacity>
);

ActionIcon.defaultProps = {
  hiddenIcon: {},
  backIcon: {},
};

ActionIcon.propTypes = {
  onIconPress: PropTypes.func.isRequired,
  hiddenIcon: PropTypes.shape({}),
  backIcon: PropTypes.shape({}),
};

export default ActionIcon;
