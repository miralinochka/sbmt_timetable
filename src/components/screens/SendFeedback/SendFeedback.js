import React, { Component } from 'react';
import {
  SafeAreaView, View, ScrollView, Text, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Input from '@common/Input';
import ContainerItem from '@common/ContainerItem';
import ModalWindow from '@common/ModalWindow';
import Spinner from '@common/Spinner';
import Header from '@common/Header';
import * as actions from '@actions';
import * as utils from '@utils';
import * as api from '@api';
import styles from './styles';

class SendFeedback extends Component {
  state = {
    userFeedback: {
      userName: '',
      email: '',
      subject: '',
      message: '',
      date: new Date().toISOString(),
    },
    feedbackError: '',
    modalState: false,
  }

  componentDidMount() {
    Header.subscribe(this.onSend, Header.eventTypes.SEND_FEEDBACK);
  }

  componentWillUnmount() {
    Header.unsubscribe(Header.eventTypes.SEND_FEEDBACK);
  }

  updateFeedback = (prop, value) => this.setState(prevState => ({
    userFeedback: { ...prevState.userFeedback, [prop]: value },
  }));

  setFeedbackError = feedbackError => this.setState({ feedbackError });

  toggleModal = modalState => this.setState({ modalState });

  onSend = async () => {
    const { toggleSpinner, showFeedbackError } = this.props;
    const { userFeedback } = this.state;
    try {
      if (utils.unfilledFeedbackValues(userFeedback)) {
        this.setFeedbackError('Пожалуйста, заполните все поля формы.');
      } else if (utils.checkValidEmail(userFeedback.email)) {
        toggleSpinner(true);
        await api.sendFeedback(userFeedback);
        toggleSpinner(false);
        this.setState({ userFeedback: {}, feedbackError: '' });
        this.toggleModal(true);
      } else {
        this.setFeedbackError('Вы ввели некорректный e-mail.');
      }
    } catch (e) {
      showFeedbackError(e);
    }
  };

  onModal = () => {
    this.toggleModal(false);
    Actions.timetable();
  };

  render() {
    const { isLoading } = this.props;
    const { userFeedback, feedbackError, modalState } = this.state;
    const {
      userName, email, subject, message,
    } = userFeedback;

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
                    onChangeText={value => this.updateFeedback('userName', value)}
                  />
                </ContainerItem>
                <ContainerItem styled={styles.сontainerItem}>
                  <Input
                    placeholder="E-mail*"
                    value={email}
                    onChangeText={value => this.updateFeedback('email', value)}
                  />
                </ContainerItem>
                <ContainerItem styled={styles.сontainerItem}>
                  <Input
                    placeholder="Тема (баг, рекомендация, оценка)*"
                    value={subject}
                    onChangeText={value => this.updateFeedback('subject', value)}
                  />
                </ContainerItem>
                <ContainerItem styled={styles.сontainerItem}>
                  <Input
                    placeholder="Сообщение*"
                    value={message}
                    onChangeText={value => this.updateFeedback('message', value)}
                    multiline
                    styled={styles.inputMessage}
                  />
                </ContainerItem>
                <ModalWindow
                  visible={modalState}
                  onClick={this.onModal}
                >
                  Спасибо! Ваш отзыв отправлен.
                </ModalWindow>
                <View style={styles.errorView}>
                  <Text style={[styles.defaultText, styles.errorText]}>{feedbackError}</Text>
                </View>
              </ScrollView>
            )}
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
SendFeedback.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  toggleSpinner: actions.toggleSpinner,
  showFeedbackError: actions.showFeedbackError,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendFeedback);
