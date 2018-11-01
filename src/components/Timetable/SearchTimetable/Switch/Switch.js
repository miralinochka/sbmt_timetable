import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles';

const Switch = ({
  toggleSearch, items, style, searchItem,
}) => (
  <View style={[styles.container, style]}>
    <View style={[styles.innerContainer, style]}>
      {
        items.map((item, index) => (
          <TouchableOpacity
            onPress={toggleSearch}
            style={[
              styles.button,
              searchItem === item && styles.colored, index === items.length - 1 && styles.noRightBorder,
            ]}
            key={item}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        ))
      }
    </View>
  </View>
);

Switch.defaultProps = {
  style: {},
};

Switch.propTypes = {
  toggleSearch: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  style: PropTypes.shape({}),
  searchItem: PropTypes.string.isRequired,
};

export default Switch;
