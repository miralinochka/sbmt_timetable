import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '@src/actions';
import * as utils from '@src/utils';
import ListItem from '@common/ListItem';

class SavedTimetable extends Component {
  onGroupPress = (group, timetableObject) => {
    const { setCurrentTimetable } = this.props;
    const subgroups = utils.getSubgroups(timetableObject.timetable);
    setCurrentTimetable(group, timetableObject.timetable, subgroups, timetableObject.filename);
    Actions.reset('_timetable', { subgroups, headerText: group[0] > 0 ? `${group} гр.` : group });
  }

  renderSavedTimetable = () => {
    const { savedTimetables } = this.props;
    return Object.keys(savedTimetables).map(item => (
      <ListItem
        key={item}
        listItem={item}
        savedTT
        onGroupPress={() => this.onGroupPress(item, savedTimetables[item])}
      />
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

SavedTimetable.propTypes = {
  setCurrentTimetable: PropTypes.func.isRequired,
  savedTimetables: PropTypes.shape({
    timetable: PropTypes.arrayOf(PropTypes.shape({})),
    createdOn: PropTypes.shape({}),
    filename: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = state => ({
  savedTimetables: state.timetable.savedTimetables,
});

const mapDispatchToProps = {
  setCurrentTimetable: actions.setCurrentTimetable,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedTimetable);
