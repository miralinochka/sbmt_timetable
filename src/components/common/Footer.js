import React from 'react';
import { SafeAreaView, TouchableOpacity, Image } from 'react-native';

export const Footer = () => {
  const { textStyle, viewStyle } = styles;
  return (
      <SafeAreaView style={viewStyle}>
        <TouchableOpacity>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../images/search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../images/bookmark.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
          style={{width: 30, height: 30}}
          source={require('../../images/settings.png')}
          />
        </TouchableOpacity>
      </SafeAreaView>
  );
};
const styles = {
  viewStyle: {
      backgroundColor: '#6fa8dc',
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      flexDirection: 'row',  
  },
};
