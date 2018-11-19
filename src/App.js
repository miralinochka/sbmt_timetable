import React from 'react';
import { Provider } from 'react-redux';
import DropDown from '@common/DropDown';
import Router from './Navigation';
import configureStore from './store';

const { store } = configureStore({});

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <Router />
    </Provider>
    <DropDown />
  </React.Fragment>
);

export default App;
