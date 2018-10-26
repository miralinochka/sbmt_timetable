import React, {Component} from 'react';
import { Text, View, FlatList, SafeAreaView } from 'react-native';
import {connect} from 'react-redux';
import TimetableItem from './TimetableItem';

class Main extends Component {
  renderCurrentTimetable = (timetable=[], currentDate) => {
    const currentMonth = currentDate.getMonth()+1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    const currentTT = timetable.filter(tt => {
      ttDate = tt.date.trim().split('.');
      ttMonth = ttDate[1][0] === '0' ? ttDate[1][1] : ttDate[1];
      return ttDate[0] == currentDay && ttMonth == currentMonth && ttDate[2] == currentYear;
    })
    console.log('currentTT', currentTT)
    return currentTT;
  }
  render() {
    const { currentTimetable, timetableError} = this.props;
    const currentDate = new Date();
    return (
      <SafeAreaView>
      {timetableError &&
      <View style={[styles.container, styles.defaultTextView]}>
        <Text style={styles.defaultText}>{timetableError}</Text>
      </View>
      }
      {
        currentTimetable && 
        <FlatList
          data={this.renderCurrentTimetable(Object.values(currentTimetable)[0], currentDate)}
          renderItem={({item}) => <TimetableItem timetableForADay={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      }
      </SafeAreaView>
    );
  }
};

const styles = {
  defaultText: {
    fontSize: 20,
  },
  defaultTextView: {
    alignItems: 'center',
    alignSelf: 'center',
  }
};

const mapStateToProps = state => console.log(state) || ({
  currentTimetable: state.currentTimetable,
  timetableError: state.timetableError,
});

export default connect(mapStateToProps)(Main);
