import { combineReducers } from 'redux';
import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE,
} from '../actions/types';

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
        const theEarliestTimetableDate = Math.min(...Object.values(state)
          .map(value => value.createdOn));
        const theEarliestTimetable = Object.keys(state)
          .find(key => +(state[key].createdOn) === theEarliestTimetableDate);
        const newState = { ...state };
        delete newState[theEarliestTimetable];
        return {
          ...newState,
          [action.payload.groupOrLecturerName]: {
            timetable: action.payload.timetable,
            createdOn: new Date(),
            filename: action.payload.filename,
          },
        };
      }
      return {
        ...state,
        [action.payload.groupOrLecturerName]: {
          timetable: action.payload.timetable,
          createdOn: new Date(),
          filename: action.payload.filename,
        },
      };
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
