import React from 'react';
import { View } from 'react-native';
import styles from './styles';

export const ContainerItem = ({ children, styled }) => (
  <View style={[styles.container, styled]}>
    {children}
  </View>
);

export default ContainerItem;
