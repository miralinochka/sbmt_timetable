import React from 'react';
import { Scene, Router, Actions, Image, TouchableOpacity } from 'react-native-router-flux';
import Timetable from './components/Timetable'
import SearchTimetable from './components/Timetable/SearchTimetable';
import {Header} from './components/Timetable/common';
import footerStyle from './components/Timetable/common/Footer/styles'


const SearchIcon = () => {
    return (<Image
      style={{width: 30, height: 30}}
      source={require('./images/search.png')}
    />)
}
const RouterComponent = () => {
  return (
    <Router>
      <Scene
          key='root'
          navBar={Header}
          tabs
          tabBarStyle={footerStyle.viewStyle}>
        <Scene key="searchTimetable" tabBarLabel='jj' icon={SearchIcon} component={SearchTimetable}
            headerText='Найти расписание'
            back
            
        />
        <Scene
          key='timetable'
          component={Timetable}
          headerText='Расписание занятий'
          showIcons
          initial
        />
      </Scene>
    </Router>
  );
}
export default RouterComponent;