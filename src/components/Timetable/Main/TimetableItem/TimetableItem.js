import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import { CardItem } from '../../common';
import colors from '../../../../colors';

const TimetableItem = ({ timetableForADay }) => {
  console.log('timetableForADay', timetableForADay);
  const {
    time, subject, building, room, lecturer, type,
  } = timetableForADay;
  const subjectType = type.toLowerCase().split(' ');
  const subjectTypeFormatted = subjectType.reduce((prevWord, nextWord) => (
    prevWord + nextWord[0]
  ), '');
  const generateBC = (subjectTypeFormatted) => {
    switch (subjectTypeFormatted) {
      case 'л':
        return colors.lectureColor;
      case 'з':
      case 'э':
        return colors.creditColor;
      case 'т':
        return colors.testingColor;
      default:
        return colors.practiseColor;
    }
  };
  return (
    <CardItem styled={styles.container}>
      <View style={styles.containerMainPart}>
        <View style={styles.containerTime}>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={[styles.rectangle, { backgroundColor: generateBC(subjectTypeFormatted) }]} />
        <View style={styles.containerLecturer}>
          <Text style={styles.subject}>
            {subject} ({subjectTypeFormatted})
          </Text>
          <Text style={styles.place}>
            {building}, ауд {room}
          </Text>
        </View>
      </View>
      <Text style={styles.lecturer}>{lecturer}</Text>
    </CardItem>
  );
};

export default TimetableItem;
