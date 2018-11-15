import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Image } from 'react-native';
import ShowTimetable from '@timetable/ShowTimetable';
import SearchTimetable from '@timetable/SearchTimetable';
import SavedTimetable from '@timetable/SavedTimetable';
import SendFeedback from '@timetable/SendFeedback';
import Header from '@common/Header';
import footerStyle from '@common/Footer';
import iconStyle from '@common/Header/ActionIcon/styles';

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
const RouterComponent = () => (
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

      />
    </Scene>
  </Router>
);


export default RouterComponent;
