import { NetInfo } from 'react-native';
import * as actions from '../actions';
import DropDownHolder from '../DropDownHolder';

export const comparator = (first, second) => {
  if (first.number < second.number) { return -1; }
  if (first.number > second.number) { return 1; }
  return 0;
};

export const getSubgroups = timetable => timetable
  .map(item => item.subgroup)
  .filter((subgr, index, array) => array.indexOf(subgr) === index);

export const checkIfGroup = groupOrLecturerFile => (
  groupOrLecturerFile && (groupOrLecturerFile[0] >= 0
    && groupOrLecturerFile[0] <= 9)
);

export const shortenLecturerName = (lecturerName) => {
  const lecturerNameArray = lecturerName.split(' ');
  return lecturerNameArray[2] ? `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}. ${lecturerNameArray[2][0]}.` : `${lecturerNameArray[0]} ${lecturerNameArray[1][0]}.`;
};

export const checkValidEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailformat);
};

export const unfilledFeedbackValues = userFeedback => (
  Object.values(userFeedback).includes('')
);

export const checkConnectionToUpdateSavedTt = async () => {
  const status = await NetInfo.isConnected.fetch();
  console.log(status)
  return status;
};

export const checkInternetConnection = (errorStatus) => {
  return errorStatus === 0;
};

export const errorCatch = error => (dispatch) => {
  console.log(error)
  const errorStatus = error !== undefined ? error.status : null;
  if (checkInternetConnection(errorStatus)) {
    DropDownHolder.alert('error', 'Ошибка сети', 'Проверьте Интернет-соединение');
  } else {
    dispatch(actions.setTimetableError());
  }
  dispatch(actions.toggleSpinner(false));
};
