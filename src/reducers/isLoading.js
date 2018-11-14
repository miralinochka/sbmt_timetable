import {
  FETCH_TIMETABLE, SET_TIMETABLE_ERROR, TOGGLE_SPINNER,
} from '../actions/types';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SPINNER:
    case FETCH_TIMETABLE:
    case SET_TIMETABLE_ERROR:
      return action.payload.spinnerMode;
    default:
      return state;
  }
};

export default isLoading;
