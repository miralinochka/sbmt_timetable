import React from 'react';
import { Provider } from 'react-redux';
import OfflineNotice from '@common/OfflineNotice';
import Router from './Router';
import configureStore from './store';
import * as utils from './utils';

const { store } = configureStore({});
const App = () => {
  utils.checkInternetConnection();
  return (
    <Provider store={store}>
      <React.Fragment>
        <OfflineNotice />
        <Router />
      </React.Fragment>
    </Provider>
  );
};

export default App;
