import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '../../../actions';
import ListItem from '../common/ListItem';

class SavedTimetable extends Component {
  onGroupPress = (group, timetableObject) => {
    const { setCurrentTimetable } = this.props;
    const subgroups = timetableObject.timetable.map(item => item.subgroup).filter((subgr, index, array) => array.indexOf(subgr) === index);
    setCurrentTimetable(group, timetableObject.timetable, subgroups, timetableObject.filename);
    console.log('onpress props', this.props, group, timetableObject);
    Actions.reset('_timetable', { subgroups, headerText: group[0] > 0 ? `${group} гр.` : group });
  }

  renderSavedTimetable = () => {
    const { timetables } = this.props;
    return Object.keys(timetables).map(item => (
      <ListItem key={item} listItem={item} savedTT onGroupPress={() => this.onGroupPress(item, timetables[item])} />
    ));
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {this.renderSavedTimetable()}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  timetables: state.timetables,
});

const mapDispatchToProps = {
  setCurrentTimetable: actions.setCurrentTimetable,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedTimetable);
