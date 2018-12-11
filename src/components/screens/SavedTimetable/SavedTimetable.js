import React, { Component } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as actions from '@actions';
import * as utils from '@utils';
import ListItem from '@common/ListItem';
import Spinner from '@common/Spinner';
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
    const { savedTimetables, deleteSavedTimetable } = this.props;
    return Object.keys(savedTimetables).map(item => (
      <Swipeout
        key={item}
        right={[
          {
            onPress: () => deleteSavedTimetable(item),
            text: 'Удалить',
            type: 'delete',
          },
        ]}
        rowId={item}
      >
        <ListItem
          listItem={item}
          savedTT
          onGroupOrLecturerPress={() => this.onGroupOrLecturerPress(item, savedTimetables[item])}
        />
      </Swipeout>
    ));
  }

  render() {
    const { isLoading } = this.props;
    return (
      <SafeAreaView>
        {isLoading ? (
          <Spinner />
        ) : (
          <ScrollView>
            {this.renderSavedTimetable()}
          </ScrollView>
        )}
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
  isLoading: PropTypes.bool.isRequired,
  deleteSavedTimetable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  savedTimetables: state.timetable.savedTimetables,
  isLoading: state.isLoading,
});

const mapDispatchToProps = {
  setCurrentTimetable: actions.setCurrentTimetable,
  downloadTimetable: actions.downloadTimetable,
  toggleSpinner: actions.toggleSpinner,
  deleteSavedTimetable: actions.deleteSavedTimetable,
};
export default connect(mapStateToProps, mapDispatchToProps)(SavedTimetable);
