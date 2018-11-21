import { combineReducers } from 'redux';
import * as utils from '@utils';
import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE,
} from '@actions/types';

const currentGroupOrLecturerInitialState = {
  name: '',
  subgroups: [],
  updatedOn: undefined,
};
const MAX_SAVED_TIMETABLES = 9;

export const savedTimetables = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
      if (Object.keys(state).length > MAX_SAVED_TIMETABLES) {
        const theEarliestTimetable = utils.getEarliestTimetable(state);
        const newState = { ...state };
        delete newState[theEarliestTimetable];
        return utils.getTimetableState(newState, action);
      }
      return utils.getTimetableState(state, action);
    default:
      return state;
  }
};

export const currentTimetable = (state = [], action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return action.payload.timetable;
    case SET_TIMETABLE_ERROR:
      return [];
    default:
      return state;
  }
};

export const currentGroupOrLecturer = (state = currentGroupOrLecturerInitialState, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return {
        groupOrLecturerName: action.payload.groupOrLecturerName,
        subgroups: action.payload.subgroups,
        filename: action.payload.filename,
      };
    case SET_TIMETABLE_ERROR:
      return currentGroupOrLecturerInitialState;
    default:
      return state;
  }
};

export const timetableError = (state = 'Расписание не найдено:(', action) => {
  switch (action.type) {
    case SET_TIMETABLE_ERROR:
      return 'Расписание не найдено:(';
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return action.payload.error || '';
    default:
      return state;
  }
};

export default combineReducers({
  savedTimetables,
  currentTimetable,
  timetableError,
  currentGroupOrLecturer,
});
