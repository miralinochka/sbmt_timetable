import React, {Component} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import {CardItem} from '../../common'
import styles from './styles';

const renderSubtitle = ({ listItem }) => {
  return listItem.speciality ? `${listItem.speciality}, ${listItem.course} курс, ${listItem.form}` : `Кафедра ${listItem.name}, ${listItem.department}`;
}
export default ListItem = ({ listItem, onGroupPress }) => {
    return (
      <TouchableOpacity onPress={onGroupPress}>
        <View>
          <CardItem styled={styles.container}>
            <Text style={styles.title}>{listItem.number || listItem.name}</Text>
            <Text style={styles.subtitle}>{renderSubtitle({ listItem })}</Text>
          </CardItem>
        </View>
      </TouchableOpacity>
    );
}

