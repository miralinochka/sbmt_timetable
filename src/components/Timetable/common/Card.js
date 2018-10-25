import React from 'react';
import { Text, View } from 'react-native';

const Card = ({ children, styled }) => {
	return (
    <View style={[styles.container, styled]}> 
      {children}
    </View>
  );
};

const styles = {
	container: {
    flex: 1,
		borderWidth: 1,
		borderRadius: 2,
    borderColor: '#ddd',
    backgroundColor: '#fff',
		borderBottomWidth: 0,
    shadowColor: 'black',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
	}
};

export { Card };
