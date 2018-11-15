import {
  SET_ERROR,
} from '../actions/types';

export default (state = '', action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload.error;
    default:
      return state;
  }
};
