import React from 'react';
import { Scene, Router, Actions, TouchableOpacity } from 'react-native-router-flux';
import { Image } from 'react-native';
import Timetable from './components/Timetable'
import SearchTimetable from './components/Timetable/SearchTimetable';
import {Header} from './components/Timetable/common';
import footerStyle from './components/Timetable/common/Footer/styles'


const SearchIcon = () => (
  <Image
    style={{width: 30, height: 30}}
    source={require('./images/search.png')}
  />
)
const TimetableIcon = () => (
  <Image
    style={{width: 30, height: 30}}
    source={require('./images/calendar.png')}
  />
)
const BookmarkIcon = () => (
  <Image
    style={{width: 30, height: 30}}
    source={require('./images/bookmark.png')}
  />
)
const RouterComponent = () => {
  return (
    <Router>
      <Scene
        key='root'
        navBar={Header}
        tabs
        tabBarStyle={footerStyle.viewStyle}
      >
        <Scene
          key="searchTimetable" 
          icon={SearchIcon} 
          component={SearchTimetable}
          headerText='Найти расписание'
          tabBarLabel=' '
          back
        />
        <Scene
          key='timetable'
          icon={TimetableIcon}
          component={Timetable}
          headerText='Расписание занятий'
          tabBarLabel=' '
          showIcons
          initial
        />
        <Scene
          key='savedTimetable'
          icon={BookmarkIcon}
          component={Timetable}
          headerText='Расписание занятий'
          tabBarLabel=' '
          showIcons
        />
      </Scene>
    </Router>
  );
}
export default RouterComponent;