import React, { Component } from 'react';
import {
  SafeAreaView, View, ScrollView, Text, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Input from '@common/Input';
import ContainerItem from '@common/ContainerItem';
import Confirm from '@common/Confirm';
import Spinner from '@common/Spinner';
import * as actions from '@src/actions';
import styles from './styles';

class SendFeedback extends Component {
  onConfirm = () => {
    const { toggleModal } = this.props;
    toggleModal(false);
    Actions.timetable();
  };

  render() {
    const { updateFeedback, feedback, isLoading } = this.props;
    const {
      userName, email, subject, message,
    } = feedback.userData;

    return (
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {isLoading ? <Spinner />
            : (
              <ScrollView>
                <View style={styles.defaultTextView}>
                  <Text style={styles.defaultText}>
                    Есть вопросы? Заполняйте форму и оставляйте Ваш отзыв!
                  </Text>
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
                    styled={{ minHeight: 150, textAlignVertical: 'top' }}
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
            )}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  feedback: state.feedback,
  isLoading: state.isLoading,
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
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback);
