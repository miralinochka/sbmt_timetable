import { NetInfo } from 'react-native';
import * as actions from '@actions';
import DropDownHolder from '@common/DropDown/DropDownHolder';
import { Actions } from 'react-native-router-flux';

export const comparator = (first, second) => {
  if (first.number < second.number) { return -1; }
  if (first.number > second.number) { return 1; }
  return 0;
};

export const getTimetableState = (state, action) => ({
  ...state,
  [action.payload.groupOrLecturerName]: {
    timetable: action.payload.timetable,
    createdOn: new Date(),
    filename: action.payload.filename,
  },
});

export const getEarliestTimetableDate = state => Math.min(...Object.values(state)
  .map(value => value.createdOn));

export const getEarliestTimetable = state => Object.keys(state)
  .find(key => +(state[key].createdOn) === getEarliestTimetableDate(state));

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
  return !!email.match(mailformat);
};

export const checkUnfilledFeedbackValues = userFeedback => (
  Object.values(userFeedback).includes('')
);

export const checkConnectionToUpdateSavedTt = async () => {
  const status = await NetInfo.isConnected.fetch();
  return status;
};

export const checkNoInternetConnection = errorStatus => errorStatus === 0;

export const errorCatch = (error, groupOrLecturerName) => (dispatch) => {
  const errorStatus = error !== undefined ? error.status : null;
  if (checkNoInternetConnection(errorStatus)) {
    DropDownHolder.alert('error', 'Ошибка сети', 'Проверьте Интернет-соединение');
  } else {
    dispatch(actions.setTimetableError());
    Actions.reset('_timetable', { headerText: checkIfGroup(groupOrLecturerName) ? `${groupOrLecturerName} гр.` : groupOrLecturerName });
  }
  dispatch(actions.toggleSpinner(false));
};
