import React from 'react';
import { Header } from 'react-navigation';
import { View, Platform } from 'react-native';


const CustomHeader = props => (
  <View
    style={{
      height: 56,
      marginTop: Platform.OS === 'ios' ? 20 : 0,
      backgroundColor: '#6200EE',
    }}
  >
    <Header {...props} />
  </View>
);

export default CustomHeader;
