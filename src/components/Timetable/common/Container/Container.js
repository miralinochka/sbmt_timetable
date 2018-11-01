import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Container = ({ children, styled }) => (
  <View style={[styles.container, styled]}>
    {children}
  </View>
);

export default Container;
