import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Image,
} from 'react-native';
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
  }

  renderMonth = currentDate => `${monthArray[currentDate.month()]}, ${currentDate.year()}`;

  renderWeek = (currentDate) => {
    const { chosenDay, onDayChange } = this.props;
    const days = [];
    const startOfWeek = currentDate.clone().startOf('isoWeek');
    const endOfWeek = currentDate.clone().endOf('isoWeek');

    console.log('startOfWeek, endOfWeek', startOfWeek, endOfWeek);
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day);
      day = day.clone().add(1, 'd');
    }
    console.log('days', days);
    return days.map((dayNumber, index) => {
      const isCurrentDay = moment().year() === dayNumber.year() && moment().month() === dayNumber.month() && moment().date() === dayNumber.date();
      const isChosenDay = chosenDay.year() === dayNumber.year() && chosenDay.month() === dayNumber.month() && chosenDay.date() === dayNumber.date();
      return (
        <View key={dayNumber} style={styles.weekdayView}>
          <Text style={styles.weekdayText}>{weekdays[index]}</Text>
          <TouchableOpacity style={[styles.dayView, isChosenDay && styles.currentDay]} onPress={() => onDayChange(dayNumber)}>
            <Text style={[styles.weekdayText, isCurrentDay && { fontWeight: '500', opacity: 1 }]}>{dayNumber.date()}</Text>
          </TouchableOpacity>
        </View>
      );
    });
  }

  nextMonth = () => {
    this.setState(prev => ({ date: prev.date.add(1, 'M') }));
  }

  prevMonth = () => {
    this.setState(prev => ({ date: prev.date.subtract(1, 'M') }));
  }

  onSwipeLeft = (gestureState) => {
    console.log('swipe left calendar');
    this.setState(prevState => ({ date: prevState.date.add(7, 'd') }));
  }

  onSwipeRight = (gestureState) => {
    console.log('swipe right calendar');
    this.setState(prevState => ({ date: prevState.date.subtract(7, 'd') }));
  }

  render() {
    const { chosenDay } = this.props;
    const { date } = this.state;
    console.log('date', date);
    return (
      <View style={styles.container}>

        <View style={styles.monthView}>
          <TouchableOpacity onPress={this.prevMonth}>
            <Image
              style={styles.arrowIcon}
              source={require('../../../../images/backGray.png')}
            />
          </TouchableOpacity>
          <Text style={styles.monthText}>{this.renderMonth(date)}</Text>
          <TouchableOpacity onPress={this.nextMonth}>
            <Image
              style={[styles.arrowIcon, { transform: [{ scaleX: -1 }] }]}
              source={require('../../../../images/backGray.png')}
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

const mapStateToProps = state => console.log(state) || ({
  currentTimetable: state.currentTimetable,
  timetableError: state.timetableError,
});

export default connect(mapStateToProps)(Calendar);
