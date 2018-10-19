import React, {Component} from 'react';
import Timetable from './components/Timetable';
import { Provider } from 'react-redux';
//import Router from './src/Router';
//import configureStore from './store';

//const store = configureStore({});
class App extends Component {
  render() {
    return (
      <Provider>
        <Timetable />
      </Provider>
    );
  }
}

export default App;