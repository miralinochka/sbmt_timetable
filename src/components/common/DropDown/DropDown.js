import React from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import DropDownHolder from './DropDownHolder';

const DropDown = () => (
  <DropdownAlert ref={ref => DropDownHolder.setDropDown(ref)} />
);

export default DropDown;
