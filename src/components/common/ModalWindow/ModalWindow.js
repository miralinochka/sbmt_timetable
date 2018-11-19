import React from 'react';
import {
  Text, View, Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import colors from '@styles/colors';
import ActionIcon from '../Header/ActionIcon';
import ContainerItem from '../ContainerItem';
import styles from '@styles';

const ModalWindow = ({
  children, onClick, visible,
}) => (
  <Modal
    animationType="slide"
    onRequestClose={() => {}}
    transparent
    visible={visible}
  >
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <ContainerItem styled={styles.cardItem}>
          <Text style={styles.text}>{children}</Text>
        </ContainerItem>
        <ContainerItem styled={[styles.cardItem, { backgroundColor: colors.mainColor }]}>
          <ActionIcon
            icon={require('@images/tick.png')} // eslint-disable-line
            onIconPress={onClick}
            styled={styles.iconStyle}
          />
        </ContainerItem>
      </View>
    </View>
  </Modal>
);

ModalWindow.propTypes = {
  onClick: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default ModalWindow;
