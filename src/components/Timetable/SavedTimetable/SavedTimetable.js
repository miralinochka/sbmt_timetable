import React, { Component } from 'react';
import { Text, SafeAreaView, FlatList } from 'react-native';

import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../actions';
import ListItem from '../SearchTimetable/ListItem';

class SavedTimetable extends Component {
  onGroupPress = (group, timetable) => {
    const { setCurrentTimetable } = this.props;
    setCurrentTimetable(group, timetable);
    Actions.timetable();
  }

  render() {
    const { timetables } = this.props;
    return (
      <SafeAreaView>
        <FlatList
          data={Object.keys(timetables)}
          renderItem={({ item }) => <ListItem listItem={item} savedTT onGroupPress={() => this.onGroupPress(item, timetables[item])} />}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  timetables: state.timetables,
  currentTimetable: state.currentTimetable,
});

const mapDispatchToProps = {
  setCurrentTimetable: actions.setCurrentTimetable,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedTimetable);
