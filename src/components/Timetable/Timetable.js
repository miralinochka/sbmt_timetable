import React, {Component, Fragment} from 'react';
import { Header, Footer, Card, CardItem, Input } from './common';

import styles from './styles'

class Timetable extends Component {
  
  render() {
    return (
      <Fragment >
        {/* <Header headerText='Расписание занятий' showIcons/> */}
        <Card>
          <CardItem>
          <Input
          placeholder='user@gmail.com'
          label='dzfg'
        />
          </CardItem>
        </Card>
        <Footer onPress={this.onPress}/>
      </Fragment>
    );
  }
}

export default Timetable;