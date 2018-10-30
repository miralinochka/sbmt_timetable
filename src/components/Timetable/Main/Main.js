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
import { Actions } from 'react-native-router-flux';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};
class Main extends Component {
  state = {
    currentDate: moment(),
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
    const { currentTimetable, subgroup } = this.props;
    const relevantTimetable = this.renderCurrentTimetable(currentTimetable, currentDate);
    console.log('relevantTimetable', relevantTimetable);
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

  render() {
    const { currentTimetable, timetableError } = this.props;
    const { currentDate } = this.state;
    console.log('main props', this.props);
    console.log('currentDate', currentDate);
    return (
      <SafeAreaView>
        {currentTimetable.length > 0
        && <Calendar chosenDay={currentDate} onDayChange={this.onCurrentDayChange} />}
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeftTimetable}
          onSwipeRight={this.onSwipeRightTimetable}
          config={config}
          style={{ height: '100%' }}
        >
          {
            currentTimetable.length > 0 && currentDate.day() !== 0
              ? (
              <ScrollView>
                {this.renderTimetable(currentDate)}
              </ScrollView>
              )
              : (
              <View style={[styles.container, styles.defaultTextView]}>
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

export default connect(mapStateToProps)(Main);
