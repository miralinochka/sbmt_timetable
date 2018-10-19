import React, {Component} from 'react';
import { View } from 'react-native'
import { Header, Footer } from './common';

class Timetable extends Component {
  render() {
    return (
      <View>
        <Header headerText='Расписание занятий'/>
        <Footer />
      </View>
    );
  }
}

export default Timetable;