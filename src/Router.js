import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Image } from 'react-native';
import ShowTimetable from './components/Timetable/ShowTimetable';
import SearchTimetable from './components/Timetable/SearchTimetable';
import SavedTimetable from './components/Timetable/SavedTimetable';
import Header from './components/Timetable/common/Header';
import footerStyle from './components/Timetable/common/Footer';


const SearchIcon = () => (
  <Image
    style={{ width: 30, height: 30 }}
    source={require('./images/search.png')}
  />
);
const TimetableIcon = () => (
  <Image
    style={{ width: 30, height: 30 }}
    source={require('./images/calendar.png')}
  />
);
const BookmarkIcon = () => (
  <Image
    style={{ width: 30, height: 30 }}
    source={require('./images/bookmark.png')}
  />
);
const RouterComponent = () => (
  <Router>
    <Scene
      key="root"
      navBar={Header}
      tabs
      tabBarStyle={footerStyle.viewStyle}
    >
      <Scene
        key="searchTimetable"
        icon={SearchIcon}
        component={SearchTimetable}
        headerText="Найти расписание"
        tabBarLabel=" "
        back
      />
      <Scene
        key="timetable"
        icon={TimetableIcon}
        component={ShowTimetable}
        headerText="Расписание занятий"
        tabBarLabel=" "
        showIcons
        initial
      />
      <Scene
        key="savedTimetable"
        icon={BookmarkIcon}
        component={SavedTimetable}
        headerText="Сохраненное расписание"
        tabBarLabel=" "
        back
      />
    </Scene>
  </Router>
);
export default RouterComponent;
