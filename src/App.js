import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import configureStore from './store';

const { store } = configureStore({});
const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
);

export default App;
