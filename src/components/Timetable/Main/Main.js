import React from 'react';
import { Text, View, FlatList } from 'react-native';
import TimetableItem from './TimetableItem';

export default Main = () => {
	return (
    <View style={styles.container}> 
    <Text>Date</Text>
    {/* <FlatList
      data={}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <TimetableItem listItem={item}/>}
    /> */}
    </View>
  );
};

const styles = {
	container: {
    flex: 1,
  },
  defaultText: {
    fontSize: 20,
  }
};
