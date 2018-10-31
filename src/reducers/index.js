import { combineReducers } from 'redux';
import searchItems from './searchItems';
import {
  timetables, currentTimetable, timetableError, currentGroupOrLecturer,
} from './timetable';

export default combineReducers({
  searchItems,
  timetables,
  currentTimetable,
  timetableError,
  currentGroupOrLecturer,
});
