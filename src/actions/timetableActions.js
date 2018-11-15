import { FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from './types';
import * as api from '../api';
import * as utils from '../utils';

export const setTimetableError = () => ({
  type: SET_TIMETABLE_ERROR,
  payload: { spinnerMode: false },
});

const checkIfGroup = groupOrLecturerFile => groupOrLecturerFile[0] >= 0
  && groupOrLecturerFile[0] <= 9;

export const downloadTimetable = groupOrLecturer => async (dispatch) => {
  const groupOrLecturerFile = groupOrLecturer.filename;
  let groupOrLecturerName = groupOrLecturer.number || groupOrLecturer.name;
  let subgroups = [];
  let timetable = [];
  try {
    if (checkIfGroup(groupOrLecturerFile)) {
      timetable = await api.getGroupTimetable(groupOrLecturerFile);
      subgroups = utils.getSubgroups(timetable);
    } else {
      timetable = await api.getLecturerTimetable(groupOrLecturerFile);
      groupOrLecturerName = utils.shortenLecturerName(groupOrLecturerName);
    }
    if (Object.values(timetable)[0]) {
      dispatch({
        type: FETCH_TIMETABLE,
        payload: {
          groupOrLecturer: groupOrLecturerName,
          timetable: timetable.length ? timetable : [timetable],
          filename: groupOrLecturerFile,
          subgroups,
          spinnerMode: false,
        },
      });
    } else {
      dispatch(setTimetableError());
    }
  } catch (e) {
    console.log('error', e);
    utils.errorCatch(dispatch);
  }
};
export const setCurrentTimetable = (groupOrLecturer, timetable, subgroups, filename) => ({
  type: SET_CURRENT_TIMETABLE,
  payload: {
    groupOrLecturer,
    timetable,
    subgroups,
    filename,
  },
});
