import { combineReducers } from 'redux';
import groupsAndLecturers from './groupsAndLecturers';
import timetable from './timetable';
import isLoading from './isLoading';
import error from './error';

export default combineReducers({
  isLoading,
  groupsAndLecturers,
  timetable,
  error,
});
