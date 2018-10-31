import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, ScrollView,
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import moment from 'moment';
import TimetableItem from './TimetableItem';
import Calendar from './Calendar';
import styles from './styles';
import * as actions from '../../../actions';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
class Main extends Component {
  state = {
    currentDate: moment(),
  }

  checkTimetable = (swipeDirection, currentDate) => {
    const { currentTimetable } = this.props;
    const day = swipeDirection === 'left' ? currentDate.clone().add(1, 'd') : currentDate.clone().subtract(1, 'd');
    console.log('day', day);
    const timetableExist = currentTimetable.find((tt) => {
      const ttDate = moment(tt.date, 'DD-MM-YYYY', 'ru').format('L');
      return ttDate === day.format('L') || day.day() === 0;
    });
    return timetableExist;
  }

  onSwipeLeftTimetable = (gestureState) => {
    console.log('swipe left');

    this.setState(prevState => ({ currentDate: prevState.currentDate.add(1, 'd') }));
  }

  onSwipeRightTimetable = (gestureState) => {
    console.log('swipe right');

    this.setState(prevState => ({ currentDate: prevState.currentDate.subtract(1, 'd') }));
  }

  renderTimetable = (currentDate) => {
    const { currentTimetable, subgroup, setTimetableError } = this.props;
    const relevantTimetable = this.renderCurrentTimetable(currentTimetable, currentDate);
    console.log('relevantTimetable', relevantTimetable);
    if (relevantTimetable.length === 0) {
      return (
        <View style={styles.defaultTextView}>
          <Text style={styles.defaultText}>Расписание не найдено:(</Text>
        </View>
      );
    }
    return relevantTimetable.map((ttItem, index) => {
      if ((ttItem.subgroup === subgroup || ttItem.subgroup === 'вся группа') || subgroup === 'вся группа') return <TimetableItem key={ttItem.time + index} timetableForADay={ttItem} />;
    });
  }

  renderCurrentTimetable = (timetable, currentDate) => {
    const currentTT = timetable.filter((tt) => {
      const ttDate = moment(tt.date, 'DD-MM-YYYY', 'ru').format('L');
      return ttDate === currentDate.format('L');
    });
    return currentTT;
  }

  onCurrentDayChange = (currentDate) => {
    this.setState({ currentDate });
  }

  getCurrentDate = () => {
    const { currentDate } = this.state;
    return currentDate.clone();
  }

  render() {
    const { currentTimetable, timetableError } = this.props;
    const { currentDate } = this.state;
    console.log('main props', this.props);
    console.log('currentDate', currentDate);
    return (
      <SafeAreaView>
        {currentTimetable.length > 0
        && <Calendar chosenDay={this.getCurrentDate()} onDayChange={this.onCurrentDayChange} />}
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeftTimetable}
          onSwipeRight={this.onSwipeRightTimetable}
          config={config}
          style={{ height: '100%' }}
        >
          {
            currentTimetable.length > 0
              ? (
                <ScrollView>
                  {this.renderTimetable(currentDate)}
                </ScrollView>
              )
              : (
                <View style={styles.defaultTextView}>
                  <Text style={styles.defaultText}>{timetableError}</Text>
                </View>
              )
          }
        </GestureRecognizer>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => console.log(state) || ({
  currentTimetable: state.currentTimetable,
  timetableError: state.timetableError,
});

const mapDispatchToProps = {
  setTimetableError: actions.setTimetableError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
