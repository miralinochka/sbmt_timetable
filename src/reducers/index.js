import { combineReducers } from 'redux';
import searchItems from './searchItems';
import { timetables, currentTimetable, timetableError, currentGroup } from './timetable';

export default combineReducers({
  searchItems,
  timetables,
  currentTimetable,
  timetableError,
  currentGroup,
});
