import { FETCH_GROUPS } from './types';
import axios from 'axios';

const comparator = (first, second) => {
  if (first.number < second.number)
    return -1;
  if (first.number > second.number)
    return 1;
  return 0;
}

export const addGroups = () => async dispatch => {
  try {
    const { data } = await axios.get('http://timetable.sbmt.by/groups/');
    data.sort(comparator);
    dispatch({
      type: FETCH_GROUPS,
      groups: data
    })
  } catch(e) {
    console.log('error', e)
  }
}

