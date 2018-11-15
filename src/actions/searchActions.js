import * as api from '../api';
import { ADD_GROUPS_AND_LECTURERS } from './types';
import * as utils from '../utils';

const addGroupsAndLecturers = () => async (dispatch) => {
  try {
    const groups = await api.fetchAllGroupsTimetable();
    const lecturers = await api.fetchAllLecturersTimetable();
    groups.sort(utils.comparator);
    dispatch({
      type: ADD_GROUPS_AND_LECTURERS,
      payload: { groups, lecturers },
    });
  } catch (e) {
    console.log('error', e);
    utils.errorCatch(dispatch);
  }
};

export default addGroupsAndLecturers;
