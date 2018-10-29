import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from '../actions/types';

const currentGroupInitialState = {
  number: '',
  subgroups: [],
};

export const timetables = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
      return { ...state, [action.groupNumber]: action.timetable };
    default:
      return state;
  }
};

export const currentTimetable = (state = [], action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return action.timetable;
    case FETCH_TIMETABLE_ERROR:
      return [];
    default:
      return state;
  }
};

export const currentGroup = (state = currentGroupInitialState, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return { number: action.groupNumber, subgroups: action.subgroups };
    case FETCH_TIMETABLE_ERROR:
      return currentGroupInitialState;
    default:
      return state;
  }
};

export const timetableError = (state = 'Расписание не найдено:(', action) => {
  switch (action.type) {
    case FETCH_TIMETABLE_ERROR:
      return action.error;
    case FETCH_TIMETABLE:
      return 'Расписание не найдено:(';
    default:
      return state;
  }
};
