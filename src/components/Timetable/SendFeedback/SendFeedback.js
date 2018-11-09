import React from 'react';
import {
  SafeAreaView, View, ScrollView, Text, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './styles';
import Input from '../common/Input';
import ContainerItem from '../common/ContainerItem';
import Confirm from '../common/Confirm';
import * as actions from '../../../actions';

const SendFeedback = ({ updateFeedback, feedback }) => {
  const {
    userName, email, subject, message,
  } = feedback.userData;
  console.log('feedback', feedback);
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.defaultTextView}>
            <Text style={styles.defaultText}>Есть вопросы? Заполняйте форму и оставляйте Ваш отзыв!</Text>
          </View>
          <ContainerItem styled={styles.сontainerItem}>
            <Input
              placeholder="Имя*"
              value={userName}
              onChangeText={text => updateFeedback({ prop: 'userName', value: text })}
            />
          </ContainerItem>
          <ContainerItem styled={styles.сontainerItem}>
            <Input
              placeholder="E-mail*"
              value={email}
              onChangeText={text => updateFeedback({ prop: 'email', value: text })}
            />
          </ContainerItem>
          <ContainerItem styled={styles.сontainerItem}>
            <Input
              placeholder="Тема (баг, рекомендация, оценка)*"
              value={subject}
              onChangeText={text => updateFeedback({ prop: 'subject', value: text })}
            />
          </ContainerItem>
          <ContainerItem styled={styles.сontainerItem}>
            <Input
              placeholder="Сообщение*"
              value={message}
              onChangeText={text => updateFeedback({ prop: 'message', value: text })}
              multiline
              styled={{ minHeight: 150 }}
            />
          </ContainerItem>
          <Confirm
            visible={feedback.modalState}
            //onClick={onAccept}
          >
            Спасибо! Ваш отзыв отправлен.
          </Confirm>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = state => ({
  feedback: state.feedback,
});

const mapDispatchToProps = {
  updateFeedback: actions.updateFeedback,
};

SendFeedback.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback);
