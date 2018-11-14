import { ADD_GROUPS_AND_LECTURERS } from '../actions/types';

const initialState = {
  groups: [],
  lecturers: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_GROUPS_AND_LECTURERS:
      return { ...state, groups: action.payload.groups, lecturers: action.payload.lecturers };
    default:
      return state;
  }
};
