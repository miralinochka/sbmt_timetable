import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Spinner = ({ size }) => (
  <View style={styles.pinner}> 
    <ActivityIndicator size={size || 'large'} />
  </View>
);

export default Spinner;
