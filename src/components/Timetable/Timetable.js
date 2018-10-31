import React, { Component } from 'react';
import Main from './Main';

class Timetable extends Component {
  render() {
    return (
      <Main subgroup={this.props.subgroup || 'вся группа'} />
    );
  }
}

export default Timetable;
