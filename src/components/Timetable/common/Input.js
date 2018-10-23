import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const Input = ({ value, onChangeText, placeholder }) => {
	return (
    <View style={styles.container}> 
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
	container: {
    justifyContent: 'center',
  },
  input: {
    color: '#000',
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 18,
    lineHeight: 20,
  },
});

export { Input };