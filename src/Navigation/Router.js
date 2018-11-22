import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import ShowTimetable from '@screens/ShowTimetable';
import SearchTimetable from '@screens/SearchTimetable';
import SavedTimetable from '@screens/SavedTimetable';
import SendFeedback from '@screens/SendFeedback';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sceneNames } from '@constants';
import Header from '@common/Header';
import {
  SearchIcon, TimetableIcon, BookmarkIcon, FeedbackIcon,
} from '@common/TabIcons';
import footerStyle from '@common/Footer';

const renderHeaderText = (currentGroupOrLecturerName) => {
  if (currentGroupOrLecturerName) {
    if (currentGroupOrLecturerName[0] > 0) return `${currentGroupOrLecturerName} гр.`;
    return currentGroupOrLecturerName;
  }
  return 'Расписание занятий';
};

const RouterComponent = ({ currentGroupOrLecturerName }) => (
  <Router>
    <Scene
      key="root"
      navBar={Header}
      tabs
      tabBarStyle={footerStyle.viewStyle}
      showLabel={false}
      transitionConfig={() => ({ screenInterpolator: screenProps => StackViewStyleInterpolator.forHorizontal(screenProps) })}
    >
      <Scene
        key={sceneNames.searchTimetable.route}
        icon={SearchIcon}
        component={SearchTimetable}
        headerText={sceneNames.searchTimetable.title}
        refresh
        back
      />
      <Scene
        key={sceneNames.timetable.route}
        icon={TimetableIcon}
        component={ShowTimetable}
        headerText={renderHeaderText(currentGroupOrLecturerName)}
        showGroups
        refresh
        initial
      />
      <Scene
        key={sceneNames.savedTimetable.route}
        icon={BookmarkIcon}
        component={SavedTimetable}
        headerText={sceneNames.savedTimetable.title}
        back
      />
      <Scene
        key={sceneNames.sendFeedback.route}
        icon={FeedbackIcon}
        component={SendFeedback}
        headerText={sceneNames.sendFeedback.title}
        back
      />
    </Scene>
  </Router>
);

const mapStateToProps = state => ({
  currentGroupOrLecturerName: state.timetable.currentGroupOrLecturer.groupOrLecturerName,
});

RouterComponent.defaultProps = {
  currentGroupOrLecturerName: '',
};

RouterComponent.propTypes = {
  currentGroupOrLecturerName: PropTypes.string,
};

export default connect(mapStateToProps)(RouterComponent);
