import React, { Component } from 'react';
import {
  SafeAreaView, View, ScrollView, Text, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import Input from '../common/Input';
import ContainerItem from '../common/ContainerItem';
import Confirm from '../common/Confirm';
import * as actions from '../../../actions';

class SendFeedback extends Component {
  onConfirm = () => {
    const { toggleModal } = this.props;
    toggleModal(false);
    Actions.timetable();
  };

  render() {
    const { updateFeedback, feedback } = this.props;
    const {
      userName, email, subject, message,
    } = feedback.userData;

    console.log('updateFeedback', updateFeedback);
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
                onChangeText={value => updateFeedback('userName', value)}
              />
            </ContainerItem>
            <ContainerItem styled={styles.сontainerItem}>
              <Input
                placeholder="E-mail*"
                value={email}
                onChangeText={value => updateFeedback('email', value)}
              />
            </ContainerItem>
            <ContainerItem styled={styles.сontainerItem}>
              <Input
                placeholder="Тема (баг, рекомендация, оценка)*"
                value={subject}
                onChangeText={value => updateFeedback('subject', value)}
              />
            </ContainerItem>
            <ContainerItem styled={styles.сontainerItem}>
              <Input
                placeholder="Сообщение*"
                value={message}
                onChangeText={value => updateFeedback('message', value)}
                multiline
                styled={{ minHeight: 150 }}
              />
            </ContainerItem>
            <Confirm
              visible={feedback.modalState}
              onClick={this.onConfirm}
            >
              Спасибо! Ваш отзыв отправлен.
            </Confirm>
            <View style={styles.errorView}>
              <Text style={[styles.defaultText, { color: 'red', textAlign: 'left' }]}>{feedback.feedbackError}</Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.feedback,
});

const mapDispatchToProps = {
  updateFeedback: actions.updateFeedback,
  toggleModal: actions.toggleModal,
  setFeedbackError: actions.setFeedbackError,
};

SendFeedback.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  feedback: PropTypes.shape({}).isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback);
