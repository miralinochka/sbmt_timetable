import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import {CardItem} from '../../common'

export default TimetableItem = ({timetableForADay}) => {
  console.log('timetableForADay', timetableForADay)
  const { time, subject, building, room, lecturer, type } = timetableForADay;
  const subjectType = type.toLowerCase().split(' ');
  const subjectTypeFormatted = subjectType.reduce((prevWord, nextWord) => (
    prevWord+nextWord[0]
  ), '');
	return (
      <CardItem styled={styles.container}>
        <View style={styles.containerMainPart}>
          <Text style={styles.time}>{time}</Text>
          <View style={styles.rectangle}></View>
          <View style={styles.mainPart}>
            <Text style={styles.subject}>{subject} ({subjectTypeFormatted})</Text>
            <Text style={styles.place}>{building}, ауд {room}</Text>
          </View>
        </View>
        <Text style={styles.lecturer}>{lecturer}</Text>
      </CardItem>
  );
};
