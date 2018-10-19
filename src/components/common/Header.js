import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, View, Image } from 'react-native';

export const Header = ({ headerText }) => {
  const { textStyle, viewStyle } = styles;
  return (
      <SafeAreaView style={viewStyle}>
          <Text style={textStyle}>{headerText}</Text>
            <TouchableOpacity>
              <Image
              style={{width: 30, height: 30}}
              source={require('../../images/refresh-button.png')}
              />
            </TouchableOpacity>
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
      flexDirection: 'row',
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',

  }
};

