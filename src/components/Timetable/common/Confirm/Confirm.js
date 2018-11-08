import React from 'react';
import { Text, View, Modal } from 'react-native';
import ContainerItem from '../ContainerItem';
import styles from './styles';

export default Confirm = ({
 children, onAccept, visible 
}) => (
    <Modal
      animationType='slide'
      onRequestClose={()=>{}}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <ContainerItem styled={styles.cardItem}>
          <Text style={styles.text}>{children}</Text>
        </ContainerItem>
        <ContainerItem>
          <Button onButtonPress={onAccept}>Yes</Button>
        </ContainerItem>
      </View>
    </Modal>
  );
