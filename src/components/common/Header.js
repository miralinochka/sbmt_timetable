import React from 'react';
import { Text, SafeAreaView } from 'react-native';

export const Header = ({ headerText }) => {
  const { textStyle, viewStyle } = styles;
  return (
      <SafeAreaView style={viewStyle}>
          <Text style={textStyle}>{headerText}</Text>
      </SafeAreaView>
  );
};
const styles = {
  viewStyle: {
      backgroundColor: '#6fa8dc',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 15
  }
};

