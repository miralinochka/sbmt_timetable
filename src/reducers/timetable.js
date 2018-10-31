import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE } from '../actions/types';

const currentGroupOrLecturerInitialState = {
  name: '',
  subgroups: [],
};

export const timetables = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
      return action.groupNumber ? { ...state, [action.groupNumber]: action.timetable } : { ...state, [action.lecturerName]: action.timetable };
    default:
      return state;
  }
};

export const currentTimetable = (state = [], action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return action.timetable.length ? action.timetable : [action.timetable];
    case FETCH_TIMETABLE_ERROR:
      return [];
    default:
      return state;
  }
};

export const currentGroupOrLecturer = (state = currentGroupOrLecturerInitialState, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    case SET_CURRENT_TIMETABLE:
      return action.groupNumber ? { name: action.groupNumber, subgroups: action.subgroups, filename: action.filename } : { name: action.lecturerName, subgroups: action.subgroups, filename: action.filename };
    case FETCH_TIMETABLE_ERROR:
      return currentGroupOrLecturerInitialState;
    default:
      return state;
  }
};

export const timetableError = (state = 'Расписание не найдено:(', action) => {
  switch (action.type) {
    case FETCH_TIMETABLE_ERROR:
      return action.error || 'Расписание не найдено:(';
    case FETCH_TIMETABLE:
      return 'Расписание не найдено:(';
    default:
      return state;
  }
};
