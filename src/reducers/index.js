import { combineReducers } from 'redux';
import searchItems from './searchItems';
import { timetables, currentTimetable, timetableError } from './timetable';

export default combineReducers({
  searchItems,
  timetables,
  currentTimetable,
  timetableError,
});
