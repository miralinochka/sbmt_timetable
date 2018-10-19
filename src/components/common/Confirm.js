import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardItem } from './CardItem';
import { Button } from './Button';

export const Confirm = ({ children, onAccept, onDecline, visible }) => {
	return (
    <Modal
      animationType='slide'
      onRequestClose={()=>{}}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <CardItem style={styles.cardItem}>
          <Text style={styles.text}>{children}</Text>
        </CardItem>

        <CardItem>
          <Button onButtonPress={onAccept}>Yes</Button>
          <Button onButtonPress={onDecline}>No</Button>
        </CardItem>
      </View>
    </Modal>
  )
};

const styles = {
  cardItem: {
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  container: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
}