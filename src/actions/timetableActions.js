import { Actions } from 'react-native-router-flux';
import * as api from '@api';
import * as utils from '@utils';
import { sceneNames } from '@constants';
import toggleSpinner from './loadingActions';
import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE,
  SET_CURRENT_SUBGROUP, DELETE_SAVED_TIMETABLE,
} from './types';

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
      const timetableXMl = await api.getGroupTimetable(groupOrLecturerFile);
      const convertedXml = await utils.convertXmlToJson(timetableXMl);
      timetable = convertedXml.schedule.lesson;
      subgroups = utils.getSubgroups(timetable);
      Actions.reset(sceneNames.timetable.name, { subgroups, headerText: `${groupOrLecturerName} гр.` });
    } else {
      const timetableXMl = await api.getLecturerTimetable(groupOrLecturerFile);
      const convertedXml = await utils.convertXmlToJson(timetableXMl);
      timetable = convertedXml.lecturer.lesson;
      groupOrLecturerName = utils.shortenLecturerName(groupOrLecturerName);
      Actions.reset(sceneNames.timetable.name, { headerText: groupOrLecturerName });
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

export const setCurrentSubgroup = subgroup => ({
  type: SET_CURRENT_SUBGROUP,
  payload: {
    subgroup,
  },
});

export const deleteSavedTimetable = groupOrLecturerName => ({
  type: DELETE_SAVED_TIMETABLE,
  payload: {
    groupOrLecturerName,
  },
});
