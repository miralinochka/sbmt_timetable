import { combineReducers } from 'redux';
import groupsAndLecturers from './groupsAndLecturers';
import timetable from './timetable';
import isLoading from './isLoading';

export default combineReducers({
  isLoading,
  groupsAndLecturers,
  timetable,
});
