import { combineReducers } from 'redux';
import searchItems from './searchItems';
import timetable from './timetable';

export default combineReducers({
  searchItems,
  timetable
});
