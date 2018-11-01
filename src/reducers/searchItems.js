import { FETCH_GROUPS, FETCH_LECTURERS } from '../actions/types';

const initialState = {
  groups: [],
  lecturers: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return { ...state, groups: action.groups };
    case FETCH_LECTURERS:
      return { ...state, lecturers: action.lecturers };
    default:
      return state;
  }
};
