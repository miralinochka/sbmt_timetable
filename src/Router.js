import React from 'react';
import { Scene, Router, Actions, Image } from 'react-native-router-flux';
import Timetable from './components/Timetable'
import SearchTimetable from './components/Timetable/SearchTimetable';
import headerStyle from './components/Timetable/Header/styles'
import {Header} from './components/Timetable/common'

const RouterComponent = () => {
  return (
    <Router>
      {/* как получить title с доченего scene */}
      <Scene key='root' navBar={Header} >
        <Scene
          key='timetable'
          component={Timetable}
          title='Расписание занятий'
          titleStyle={headerStyle.title}
          leftTitle="dca"
          headerText='Расписание занятий' showIcons
        >
        </Scene>
        <Scene
          key='searchTimetable'
          component={SearchTimetable}
          title='Поиск расписания'
          titleStyle={headerStyle.title}
          headerText='Поиск расписания'
        />
      </Scene>
    </Router>
  );
}
export default RouterComponent;