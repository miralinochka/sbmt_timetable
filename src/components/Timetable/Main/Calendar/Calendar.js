import React, { Component } from 'react';
import {
  Text, View, FlatList, SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';

class Calendar extends Component {
  render() {
    const currentDate = new Date();
    return (
      <SafeAreaView>
        {
        currentTimetable
          ? (
            <FlatList
              data={this.renderCurrentTimetable(Object.values(currentTimetable)[0], currentDate)}
              renderItem={({ item }) => <TimetableItem timetableForADay={item} />}
              keyExtractor={(item, index) => index.toString()}
            />
          )
          : (
            <View style={[styles.container, styles.defaultTextView]}>
              <Text style={styles.defaultText}>{timetableError}</Text>
            </View>
          )
        }
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => console.log(state) || ({
  currentTimetable: state.currentTimetable,
  timetableError: state.timetableError,
});

export default connect(mapStateToProps)(Calendar);
