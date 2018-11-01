import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import ContainerItem from '../ContainerItem';
import styles from './styles';

const renderSubtitle = ({ listItem }) => ((listItem.speciality)
  ? (`${listItem.speciality}, ${listItem.course} курс, ${listItem.form}`)
  : (`Кафедра ${listItem.department}, ${listItem.position.toLowerCase()}`));

const ListItem = ({ listItem, onGroupPress, savedTT }) => (
  <TouchableOpacity onPress={onGroupPress}>
    <View>
      <ContainerItem styled={[styles.container, savedTT && { paddingVertical: 15 }]}>
        <Text style={styles.title}>{ savedTT ? listItem : (listItem.number || listItem.name) }</Text>
        {!savedTT && <Text style={styles.subtitle}>{renderSubtitle({ listItem })}</Text>}
      </ContainerItem>
    </View>
  </TouchableOpacity>
);
export default ListItem;
