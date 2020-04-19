import React, { Component } from 'react';
import {
  Text, View, TouchableOpacity, Image, Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import GestureRecognizer from 'react-native-swipe-gestures';
import generalStyles from '@styles/general';
import styles from './styles';
import * as constants from '@constants';

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


  renderMonth = date => `${constants.monthArray[date.month()]}, ${date.year()}`;

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

    const dayStyles = [styles.weekdayText];
    if (isCurrentDay) dayStyles.push(styles.currentDay);
    if (isChosenDay) dayStyles.push(styles.chosenDayText);
    return (
      <View key={dayNumber} style={styles.weekdayView}>
        <Text style={styles.weekdayText}>{constants.weekdays[index]}</Text>
        <TouchableOpacity
          style={[styles.dayView, isChosenDay && styles.chosenDay]}
          onPress={() => onDayChange(dayNumber)}
        >
          <Text style={dayStyles}>{dayNumber.date()}</Text>
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
      <View style={[styles.container, Platform.OS === 'ios' && generalStyles.defaultPaddingHorizontal]}>
        {Platform.OS === 'android' ? (
          <View style={[styles.monthView, styles.monthViewAndroid]}>
            <TouchableOpacity onPress={this.prevMonth} style={[styles.arrowStyle, styles.monthArrowStyle, styles.monthArrowStyleLeft]}>
              <Image
                style={styles.arrowIconSmall}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
            <Text style={styles.monthText}>{this.renderMonth(date)}</Text>
            <TouchableOpacity onPress={this.nextMonth} style={[styles.arrowStyle, styles.monthArrowStyle]}>
              <Image
                style={[styles.arrowIconSmall, styles.flippedButton]}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.monthView}>
            <TouchableOpacity onPress={this.prevMonth} style={styles.arrowStyle}>
              <Image
                style={styles.arrowIcon}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
            <Text style={styles.monthText}>{this.renderMonth(date)}</Text>
            <TouchableOpacity onPress={this.nextMonth} style={styles.arrowStyle}>
              <Image
                style={[styles.arrowIcon, styles.flippedButton]}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
          </View>
        )}
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          config={constants.gestureConfig}
        >
          <View style={styles.weekdaysContainer}>
            {Platform.OS === 'android' && (
            <TouchableOpacity onPress={this.onSwipeRight} style={styles.arrowStyle}>
              <Image
                style={styles.arrowIcon}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
            )}
            <View style={styles.weekdaysInnerContainer}>
              {this.renderWeek(date)}
            </View>
            {Platform.OS === 'android' && (
            <TouchableOpacity onPress={this.onSwipeLeft} style={styles.arrowStyle}>
              <Image
                style={[styles.arrowIcon, styles.flippedButton]}
                source={require('@images/backGray.png')} // eslint-disable-line
              />
            </TouchableOpacity>
            )}
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
