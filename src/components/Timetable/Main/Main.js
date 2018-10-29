import React, { Component } from 'react';
import {
  Text, View, SafeAreaView, ScrollView,
} from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import { connect } from 'react-redux';
import moment from 'moment';
import TimetableItem from './TimetableItem';
import styles from './styles';
import actions from '../../../actions';

class Main extends Component {
  state = {
    currentDate: moment(),
  }

  onSwipeLeft = (gestureState) => {
    console.log('swipe left');
    this.setState(prevState => ({ currentDate: prevState.currentDate.add(1, 'd') }));
  }

  onSwipeRight = (gestureState) => {
    console.log('swipe right');
    this.setState(prevState => ({ currentDate: prevState.currentDate.subtract(1, 'd') }));
  }
  // onSwipe = (gestureName, gestureState) => {

  //   const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   switch (gestureName) {
  //     case SWIPE_LEFT:
  //     case SWIPE_RIGHT:
  //     const { setTimetableError } = this.props;
  //     setTimetableError('')
  //   }
  // }

  renderTimetable = (currentDate) => {
    const { currentTimetable, subgroup } = this.props;
    const relevantTimetable = this.renderCurrentTimetable(currentTimetable, currentDate);
    console.log('relevantTimetable', relevantTimetable);
    return relevantTimetable.map((ttItem, index) => {
      if (subgroup === ttItem.subgroup || !subgroup) {
        return (<TimetableItem key={ttItem.time + index} timetableForADay={ttItem} />);
      }
    });
  }

  renderCurrentTimetable = (timetable, currentDate) => {
    const currentTT = timetable.filter((tt) => {
      const ttDate = moment(tt.date, 'DD-MM-YYYY', 'ru').format('L');
      return ttDate === currentDate.format('L');
    });
    return currentTT;
  }

  render() {
    const { currentTimetable, timetableError } = this.props;
    const { currentDate } = this.state;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80,
    };
    console.log('main props', this.props);
    console.log('currentDate', currentDate)
    return (
      <SafeAreaView>
        <GestureRecognizer
          onSwipeLeft={this.onSwipeLeft}
          onSwipeRight={this.onSwipeRight}
          config={config}
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
const mapDispatchToProps = {
 
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
