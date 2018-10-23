import React from 'react';
import { Text, View } from 'react-native';

export default Main = () => {
	return (
    <View style={styles.container}> 
      <Text style={styles.defaultText}>Расписание не выбрано:(</Text>
    </View>
  );
};

const styles = {
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultText: {
    fontSize: 20,
  }
};
