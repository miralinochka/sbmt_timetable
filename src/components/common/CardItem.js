import React from 'react';
import { Text, View } from 'react-native';

export const CardItem = ({ children, stylish }) => {
  console.log('style', stylish)
	return (
    <View style={[styles.container, stylish]}> 
      {children}
    </View>
  );
};

const styles = {
	container: {
		borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',  		
	}
};
