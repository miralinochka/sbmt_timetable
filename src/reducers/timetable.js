import { combineReducers } from 'redux';
import * as utils from '@utils';
import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE, SET_CURRENT_SUBGROUP, DELETE_SAVED_TIMETABLE,
} from '@actions/types';
import { noTimetableError } from '@constants';

const currentGroupOrLecturerInitialState = {
  groupOrLecturerName: '',
  subgroups: [],
  currentSubgroup: 'вся группа',
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
    case DELETE_SAVED_TIMETABLE:
      const newState = { ...state };
      delete newState[action.payload.groupOrLecturerName];
      return newState;
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
        currentSubgroup: currentGroupOrLecturerInitialState.currentSubgroup,
        filename: action.payload.filename,
      };
    case SET_TIMETABLE_ERROR:
      return currentGroupOrLecturerInitialState;
    case SET_CURRENT_SUBGROUP:
      return {
        ...state,
        currentSubgroup: action.payload.subgroup,
      };
    default:
      return state;
  }
};

export const timetableError = (state = noTimetableError, action) => {
  switch (action.type) {
    case SET_TIMETABLE_ERROR:
      return noTimetableError;
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
