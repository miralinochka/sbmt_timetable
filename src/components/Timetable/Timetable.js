import React, {Component, Fragment} from 'react';
import { Header, Footer, Card, CardItem, Input } from './common';
import Main from './Main';

class Timetable extends Component {
  
  render() {
    return (
      <Fragment >
        <Main />
        {/* <Footer onPress={this.onPress}/> */}
      </Fragment>
    );
  }
}

export default Timetable;