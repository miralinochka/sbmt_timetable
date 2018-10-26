import { FETCH_TIMETABLE, FETCH_TIMETABLE_ERROR } from '../actions/types';

export const timetables =  (state={}, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    return {...state, [action.groupNumber]: action.timetable}
    default:
    return state;
  }
}

export const currentTimetable = (state=null, action) => {
  switch (action.type) {
    case FETCH_TIMETABLE:
    return {[action.groupNumber]: action.timetable}
    case FETCH_TIMETABLE_ERROR:
    return null;
    default:
    return state;
  }
}

export const timetableError = (state='Расписание не найдено:(', action) => {
  switch (action.type) {
    case FETCH_TIMETABLE_ERROR:
    return action.error
    case FETCH_TIMETABLE:
    return null;
    default:
    return state;
  }
}