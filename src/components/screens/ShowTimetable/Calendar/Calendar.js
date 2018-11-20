import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import styles from './styles';

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const monthArray = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];
const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

class Calendar extends Component {
  state = {
    date: moment(),
    chosenDay: this.props.chosenDay, // eslint-disable-line
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.chosenDay.isSame(nextProps.chosenDay)) {
      return {
        date: nextProps.chosenDay.clone(),
        chosenDay: nextProps.chosenDay,
      };
    }
    return null;
  }

  renderMonth = date => `${monthArray[date.month()]}, ${date.year()}`;

  renderWeek = (currentDate) => {
    const days = [];
    const startOfWeek = currentDate.clone().startOf('isoWeek');
    const endOfWeek = currentDate.clone().endOf('isoWeek');
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    return days.map((dayNumber, index) => this.renderDay(dayNumber, index));
  }

  renderDay = (dayNumber, index) => {
    const { chosenDay, onDayChange } = this.props;
    const isCurrentDay = moment().year() === dayNumber.year()
      && moment().month() === dayNumber.month()
      && moment().date() === dayNumber.date();
    const isChosenDay = chosenDay.year() === dayNumber.year()
      && chosenDay.month() === dayNumber.month()
      && chosenDay.date() === dayNumber.date();
    return (
      <View key={dayNumber} style={styles.weekdayView}>
        <Text style={styles.weekdayText}>{weekdays[index]}</Text>
        <TouchableOpacity
          style={[styles.dayView, isChosenDay && styles.currentDay]}
          onPress={() => onDayChange(dayNumber)}
        >
          <Text style={[styles.weekdayText, isCurrentDay && { fontWeight: '500', opacity: 1 }]}>{dayNumber.date()}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  nextMonth = () => this.setState(prev => ({ date: prev.date.add(1, 'M') }));

  prevMonth = () => this.setState(prev => ({ date: prev.date.subtract(1, 'M') }));

  onSwipeLeft = () => this.setState(prevState => ({ date: prevState.date.add(7, 'd') }));

  onSwipeRight = () => this.setState(prevState => ({ date: prevState.date.subtract(7, 'd') }));

  render() {
    const { date } = this.state;
    return (
      <View style={styles.container}>

        <View style={styles.monthView}>
          <TouchableOpacity onPress={this.prevMonth}>
            <Image
              style={styles.arrowIcon}
              source={require('@images/backGray.png')} // eslint-disable-line
            />
          </TouchableOpacity>
          <Text style={styles.monthText}>{this.renderMonth(date)}</Text>
          <TouchableOpacity onPress={this.nextMonth}>
            <Image
              style={[styles.arrowIcon, { transform: [{ scaleX: -1 }] }]}
              source={require('@images/backGray.png')} // eslint-disable-line
            />
          </TouchableOpacity>
        </View>
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          config={config}
        >
          <View style={styles.weekdaysContainer}>
            {this.renderWeek(date)}
          </View>
        </GestureRecognizer>
      </View>
    );
  }
}

Calendar.propTypes = {
  onDayChange: PropTypes.func.isRequired,
  chosenDay: PropTypes.shape({}).isRequired,
};

const mapStateToProps = state => ({
  timetableError: state.timetable.timetableError,
});

export default connect(mapStateToProps)(Calendar);
