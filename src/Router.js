import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShowTimetable from './components/Timetable/ShowTimetable';
import SearchTimetable from './components/Timetable/SearchTimetable';
import SavedTimetable from './components/Timetable/SavedTimetable';
import SendFeedback from './components/Timetable/SendFeedback';
import Header from './components/Timetable/common/Header';
import footerStyle from './components/Timetable/common/Footer';
import iconStyle from './components/Timetable/common/Header/ActionIcon/styles';
import * as actions from './actions';

const SearchIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('./images/search.png')} // eslint-disable-line 
  />
);
const TimetableIcon = () => (

  <Image
    style={iconStyle.icon}
    source={require('./images/calendar.png')} // eslint-disable-line 
  />
);
const BookmarkIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('./images/bookmark.png')} // eslint-disable-line 
  />
);
const FeedbackIcon = () => (
  <Image
    style={iconStyle.icon}
    source={require('./images/chat.png')} // eslint-disable-line 
  />
);
const RouterComponent = ({ toggleModal }) => (
  <Router>
    <Scene
      key="root"
      navBar={Header}
      tabs
      tabBarStyle={footerStyle.viewStyle}
      showLabel={false}
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
        headerText="Расписание занятий"
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
        onExit={() => toggleModal(false)}
      />
    </Scene>
  </Router>
);

RouterComponent.propTypes = {
  toggleModal: PropTypes.func.isRequired,
};

export default connect(null, { toggleModal: actions.toggleModal })(RouterComponent);
