import { FETCH_TIMETABLE } from '../actions/types';

export default (state=[], action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    return action.timetable
    default:
    return state;
  }
}