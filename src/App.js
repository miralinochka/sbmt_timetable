import React from 'react';
import { Provider } from 'react-redux';
import DropDown from '@common/DropDown';
import { PersistGate } from 'redux-persist/integration/react';
import Router from './Navigation';
import configureStore from './store';

const { store, persistor } = configureStore({});

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router />
      {/* </PersistGate> */}
    </Provider>
    <DropDown />
  </React.Fragment>
);

export default App;
