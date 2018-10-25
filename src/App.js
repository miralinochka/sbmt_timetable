import React, {Component} from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from './store';

const store = configureStore({}).store;
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;