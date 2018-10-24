import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import {CardItem} from '../../common'

export default TimetableItem = () => {
	return (
      <CardItem styled={styles.container}>
        <View style={styles.containerMainPart}>
          <Text style={styles.time}>8:50</Text>
          <View style={styles.rectangle}></View>
          <View style={styles.mainPart}>
            <Text style={styles.subject}>Физическая культура (пр)</Text>
            <Text style={styles.place}>Кальварийская, ауд 9</Text>
          </View>
        </View>
        <Text style={styles.lecturer}>Омелюсик О В</Text>
      </CardItem>
  );
};
