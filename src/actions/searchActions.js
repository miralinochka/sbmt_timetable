import axios from 'axios';
import { FETCH_GROUPS, FETCH_LECTURERS } from './types';

const comparator = (first, second) => {
  if (first.number < second.number) { return -1; }
  if (first.number > second.number) { return 1; }
  return 0;
};

export const addGroups = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://timetable.sbmt.by/groups/');
    data.sort(comparator);
    dispatch({
      type: FETCH_GROUPS,
      groups: data,
    });
  } catch (e) {
    console.log('error', e);
  }
};

export const addLecturers = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://timetable.sbmt.by/lecturers/');
    data.sort(comparator);
    dispatch({
      type: FETCH_LECTURERS,
      lecturers: data,
    });
  } catch (e) {
    console.log('error', e);
  }
};
