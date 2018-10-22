import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const Button = ({ children, onButtonPress }) => {
	return (
    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  text: {
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingBottom: 10,
    paddingTop: 10,
  },
	button: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
	}
};

export { Button };