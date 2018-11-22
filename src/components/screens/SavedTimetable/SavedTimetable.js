import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '@actions';
import * as utils from '@utils';
import ListItem from '@common/ListItem';
import { sceneNames } from '@constants';

class SavedTimetable extends Component {
  onGroupOrLecturerPress = async (pressedTTItem, timetableObject) => {
    const { setCurrentTimetable, downloadTimetable, toggleSpinner } = this.props;
    const subgroups = utils.getSubgroups(timetableObject.timetable);
    const chosenGroupOrLecturer = {
      groupOrLecturerName: pressedTTItem,
      timetable: timetableObject.timetable,
      subgroups,
      filename: timetableObject.filename,
    };
    if (await utils.checkConnectionToUpdateSavedTt()) {
      toggleSpinner(true);
      await downloadTimetable(chosenGroupOrLecturer, new Date());
    } else {
      setCurrentTimetable({ ...chosenGroupOrLecturer });
      Actions.reset(sceneNames.timetable.name, { subgroups, headerText: pressedTTItem[0] > 0 ? `${pressedTTItem} гр.` : pressedTTItem });
    }
  }

  renderSavedTimetable = () => {
    const { savedTimetables } = this.props;
    return Object.keys(savedTimetables).map(item => (
      <ListItem
        key={item}
        listItem={item}
        savedTT
        onGroupOrLecturerPress={() => this.onGroupOrLecturerPress(item, savedTimetables[item])}
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
  downloadTimetable: actions.downloadTimetable,
  toggleSpinner: actions.toggleSpinner,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedTimetable);
