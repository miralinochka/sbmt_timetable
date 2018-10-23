import { FETCH_GROUPS} from '../actions/types';

const initialState = {
  groups: [],
  lecturers: [],
}
export default (state=initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
    return { ...state, groups: action.groups};
    default:
    return state;
  }
}