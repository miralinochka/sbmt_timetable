import * as api from '../api';
import { ADD_GROUPS_AND_LECTURERS } from './types';
import * as utils from '../utils';
import toggleSpinner from './loadingActions';

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
    dispatch(utils.errorCatch(e.request || e));
  }
  dispatch(toggleSpinner(false));
};

export default addGroupsAndLecturers;
