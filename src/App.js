import React from 'react';
import { Provider } from 'react-redux';
import DropdownAlert from 'react-native-dropdownalert';
import OfflineNotice from '@common/OfflineNotice';
import { connect } from 'react-redux';
import Router from './Router';
import configureStore from './store';

export class DropDownHolder {
  static dropDown;

  static setDropDown(dropDown) {
    this.dropDown = dropDown;
  }

  static getDropDown() {
    return this.dropDown;
  }
}


const { store } = configureStore({});

class App extends React.Component {
  showDropDown = () => {
    const { error } = this.props;
    if (error) this.dropdown.alertWithType('error', 'Error', error.message);
  }

  render() {
    return (
      <React.Fragment>
        <Provider store={store}>
          <React.Fragment>
            <OfflineNotice />
            <Router />
          </React.Fragment>
        </Provider>
        <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} />
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps)(App);
