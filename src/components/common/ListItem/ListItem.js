import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import ContainerItem from '../ContainerItem';
import styles from './styles';

const renderSubtitle = ({ listItem }) => ((listItem.speciality)
  ? (`${listItem.speciality}, ${listItem.course} курс, ${listItem.form}`)
  : (`Кафедра ${listItem.department}, ${listItem.position.toLowerCase()}`));

const ListItem = ({ listItem, onSavedTtPress, savedTT }) => (
  <TouchableOpacity onPress={onSavedTtPress}>
    <View>
      <ContainerItem styled={[styles.container, savedTT && { paddingVertical: 15 }]}>
        <Text style={styles.title}>
          { savedTT ? listItem : (listItem.number || listItem.name) }
        </Text>
        {!savedTT && <Text style={styles.subtitle}>{renderSubtitle({ listItem })}</Text>}
      </ContainerItem>
    </View>
  </TouchableOpacity>
);

ListItem.defaultProps = {
  savedTT: null,
  listItem: {},
};

ListItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  listItem: PropTypes.any,
  onSavedTtPress: PropTypes.func.isRequired,
  savedTT: PropTypes.bool,
};

export default ListItem;
