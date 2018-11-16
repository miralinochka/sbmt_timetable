import React from 'react';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import Router from './Router';
import configureStore from './store';
import DropDownHolder from './DropDownHolder';


const { store } = configureStore({});

const App = () => (
  <React.Fragment>
    <Provider store={store}>
      <Router />
    </Provider>
    <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} />
  </React.Fragment>
);

export default App;
