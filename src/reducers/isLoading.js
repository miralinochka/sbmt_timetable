import {
  TOGGLE_SPINNER,
} from '@actions/types';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SPINNER:
      return action.payload.spinnerMode;
    default:
      return state;
  }
};

export default isLoading;
