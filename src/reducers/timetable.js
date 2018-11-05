import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, SET_CURRENT_TIMETABLE, TOGGLE_SPINNER,
} from '../actions/types';

const currentGroupOrLecturerInitialState = {
  name: '',
  subgroups: [],
};

export const timetables = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
      if (Object.keys(state).length > 9) {
        const theEarliestTimetableDate = Math.min(...Object.values(state)
          .map(value => value.createdOn));
        const theEarliestTimetable = Object.keys(state)
          .find(key => +(state[key].createdOn) === theEarliestTimetableDate);
        const newState = { ...state };
        delete newState[theEarliestTimetable];
        return {
          ...newState,
          [action.groupOrLecturer]: {
            timetable: action.timetable,
            createdOn: new Date(),
            filename: action.filename,
          },
        };
      }
      return {
        ...state,
        [action.groupOrLecturer]: {
          timetable: action.timetable,
          createdOn: new Date(),
          filename: action.filename,
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
      return action.timetable;
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
        name: action.groupOrLecturer,
        subgroups: action.subgroups,
        filename: action.filename,
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
      return action.error || '';
    default:
      return state;
  }
};

export const isLoading = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SPINNER:
    case FETCH_TIMETABLE:
    case SET_TIMETABLE_ERROR:
      return action.spinnerMode;
    default:
      return state;
  }
};
