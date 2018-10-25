import { FETCH_TIMETABLE } from '../actions/types';

export const timetables =  (state=[], action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    return [...state, action.timetable]
    default:
    return state;
  }
}

export const currentTimetable = (state=null, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    return action.timetable
    default:
    return state;
  }
}