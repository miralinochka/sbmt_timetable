import React from 'react';
import { Text, View } from 'react-native';

export const CardItem = ({ children, styled }) => {
	return (
    <View style={[styles.container, styled]}> 
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
	}
};
