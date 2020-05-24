import { NetInfo } from 'react-native';
import { parseString } from 'react-native-xml2js';
import * as actions from '@actions';
import DropDownHolder from '@common/DropDown/DropDownHolder';
import { Actions } from 'react-native-router-flux';
import { sceneNames } from '@constants';
import moment from 'moment';
import colors from '@styles/colors';

export const comparator = (first, second) => {
  const firstNumber = parseInt(first.number, 10);
  const secondNumber = parseInt(second.number, 10);
  if (firstNumber < secondNumber) { return -1; }
  if (firstNumber > secondNumber) { return 1; }
  return 0;
};

export const printHeaderText = (currentGroupOrLecturerName) => {
  if (currentGroupOrLecturerName) {
    if (currentGroupOrLecturerName[0] > 0) return `${currentGroupOrLecturerName} гр.`;
    return currentGroupOrLecturerName;
  }
  return 'Расписание занятий';
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

export const hasRussianSymbols = (email) => {
  return email.match(/[а-яА-я]+/);
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
    Actions.reset(sceneNames.timetable.name, { headerText: groupOrLecturerName && checkIfGroup(groupOrLecturerName) ? `${groupOrLecturerName} гр.` : groupOrLecturerName || 'Расписание занятий' });
  }
  dispatch(actions.toggleSpinner(false));
};

export const getCurrentTimetable = (timetable, currentDate) => {
  const currentTT = timetable.filter((tt) => {
    const ttDate = moment(tt.date, 'DD.MM.YYYY').format('L');
    return ttDate === currentDate.format('L');
  });
  return currentTT;
};

export const generateBackgroundColor = (subjectTypeForm) => {
  switch (subjectTypeForm) {
    case 'л':
      return colors.lectureColor;
    case 'з':
    case 'э':
      return colors.creditColor;
    case 'т':
    case 'уср':
    case 'кср':
      return colors.testingColor;
    default:
      return colors.practiceColor;
  }
};

export const convertXmlToJson = xml => new Promise((resolve, reject) => {
  parseString(xml, { explicitArray: false }, (err, result) => {
    if (err) {
      reject(err);
    }
    resolve(result);
  });
});
