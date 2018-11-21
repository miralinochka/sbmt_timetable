import { Actions } from 'react-native-router-flux';
import { FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from './types';
import * as api from '@api';
import * as utils from '@utils';
import toggleSpinner from './loadingActions';

export const setTimetableError = () => ({
  type: SET_TIMETABLE_ERROR,
});

export const downloadTimetable = (groupOrLecturer, updatedOn) => async (dispatch) => {
  const groupOrLecturerFile = groupOrLecturer.filename;
  let groupOrLecturerName = groupOrLecturer.number
    || groupOrLecturer.name
    || groupOrLecturer.groupOrLecturerName;
  let subgroups = [];
  let timetable = [];
  try {
    if (utils.checkIfGroup(groupOrLecturerFile)) {
      timetable = await api.getGroupTimetable(groupOrLecturerFile);
      subgroups = utils.getSubgroups(timetable);
      Actions.reset('_timetable', { subgroups, headerText: `${groupOrLecturerName} гр.` });
    } else {
      timetable = await api.getLecturerTimetable(groupOrLecturerFile);
      groupOrLecturerName = utils.shortenLecturerName(groupOrLecturerName);
      Actions.reset('_timetable', { headerText: groupOrLecturerName });
    }
    if (Object.values(timetable)[0]) {
      dispatch({
        type: FETCH_TIMETABLE,
        payload: {
          groupOrLecturerName,
          timetable: timetable.length ? timetable : [timetable],
          filename: groupOrLecturerFile,
          subgroups,
          upDatedOn: updatedOn,
        },
      });
    } else {
      dispatch(setTimetableError());
    }
  } catch (e) {
    dispatch(utils.errorCatch(e.request || e, groupOrLecturerName));
  }
  dispatch(toggleSpinner(false));
};

export const setCurrentTimetable = ({
  groupOrLecturerName, timetable, subgroups, filename,
}) => ({
  type: SET_CURRENT_TIMETABLE,
  payload: {
    groupOrLecturerName,
    timetable,
    subgroups,
    filename,
  },
});
