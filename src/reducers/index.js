import { combineReducers } from 'redux';
import searchItems from './searchItems';
import {
  timetables, currentTimetable, timetableError, currentGroupOrLecturer, isLoading,
} from './timetable';

export default combineReducers({
  isLoading,
  searchItems,
  timetables,
  currentTimetable,
  timetableError,
  currentGroupOrLecturer,
});
