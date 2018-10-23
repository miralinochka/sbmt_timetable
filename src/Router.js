import React from 'react';
import { Scene, Router, Actions, Image } from 'react-native-router-flux';
import Timetable from './components/Timetable'
import SearchTimetable from './components/Timetable/SearchTimetable';
import {Header} from './components/Timetable/common'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='root' navBar={Header} >
        <Scene
          key='timetable'
          component={Timetable}
          headerText='Расписание занятий'
          showIcons
        >
        </Scene>
        <Scene
          key='searchTimetable'
          component={SearchTimetable}
          headerText='Найти расписание'
          back
          initial
        />
      </Scene>
    </Router>
  );
}
export default RouterComponent;