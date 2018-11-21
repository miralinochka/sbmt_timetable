import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import ShowTimetable from '@screens/ShowTimetable';
import SearchTimetable from '@screens/SearchTimetable';
import SavedTimetable from '@screens/SavedTimetable';
import SendFeedback from '@screens/SendFeedback';
import { connect } from 'react-redux';
import Header from '@common/Header';
import {
  SearchIcon, TimetableIcon, BookmarkIcon, FeedbackIcon,
} from '@common/TabIcons';
import footerStyle from '@common/Footer';

const renderHeaderText = (currentGroupOrLecturerName) => {
  if (currentGroupOrLecturerName) {
    if (currentGroupOrLecturerName[0] > 0) return `${currentGroupOrLecturerName} гр.`;
    return currentGroupOrLecturerName;
  } else {
    return 'Расписание занятий';
  }
}

const RouterComponent = ({ currentGroupOrLecturerName }) => (
  <Router>
    <Scene
      key="root"
      navBar={Header}
      tabs
      tabBarStyle={footerStyle.viewStyle}
      showLabel={false}
      transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}
    >
      <Scene
        key="searchTimetable"
        icon={SearchIcon}
        component={SearchTimetable}
        headerText="Найти расписание"
        refresh
        back
      />
      <Scene
        key="timetable"
        icon={TimetableIcon}
        component={ShowTimetable}
        headerText={renderHeaderText(currentGroupOrLecturerName)}
        showGroups
        refresh
        initial
      />
      <Scene
        key="savedTimetable"
        icon={BookmarkIcon}
        component={SavedTimetable}
        headerText="Сохраненное расписание"
        back
      />
      <Scene
        key="sendFeedback"
        icon={FeedbackIcon}
        component={SendFeedback}
        headerText="Напишите нам"
        back
      />
    </Scene>
  </Router>
);

const mapStateToProps = state => ({
  currentGroupOrLecturerName: state.timetable.currentGroupOrLecturer.groupOrLecturerName,
});

export default connect(mapStateToProps)(RouterComponent);
