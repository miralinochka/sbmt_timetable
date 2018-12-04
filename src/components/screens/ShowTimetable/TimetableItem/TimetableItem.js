import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import ContainerItem from '@common/ContainerItem';
import styles from './styles';
import * as utils from '@utils';

const TimetableItem = ({ timetableForADay }) => {
  const {
    time, subject, building, room, lecturer, type, subgroup, group,
  } = timetableForADay;
  const subjectType = type.toLowerCase().trim().split(' ');
  const subjectTypeShort = subjectType.reduce((prevWord, nextWord) => (
    prevWord + nextWord[0]
  ), '');

  return (
    <ContainerItem styled={styles.container}>
      <View style={styles.containerMainPart}>
        <View style={styles.containerTime}>
          <Text style={styles.time}>{time}</Text>
          {
            subgroup && subgroup[0] > 0 && subgroup[0] < 9 && (
            <Text style={styles.place}>
              {`${subgroup[0]} подгр.`}
            </Text>
            )
          }
        </View>
        <View
          style={[
            styles.rectangle,
            { backgroundColor: utils.generateBackgroundColor(subjectTypeShort) },
          ]}
        />
        <View style={styles.containerLecturer}>
          <Text style={styles.subject}>
            {`${subject} (${subjectTypeShort})`}
          </Text>
          <Text style={styles.place}>
            {`${building}, ауд ${room}`}
          </Text>
        </View>
      </View>
      <Text style={styles.lecturer}>{lecturer || group}</Text>
    </ContainerItem>
  );
};

TimetableItem.propTypes = {
  timetableForADay: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default TimetableItem;
