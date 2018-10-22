import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Spinner = ({ size }) => {
	return (
    <View style={styles.pinner}> 
      <ActivityIndicator size={size || 'large'}/>
    </View>
  );
};

const styles = {
  spinner: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center', 
  }
}
