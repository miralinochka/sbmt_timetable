import {
  SEND_FEEDBACK, UPDATE_FEEDBACK, FEEDBACK_ERROR, TOGGLE_MODAL,
} from '../actions/types';

const initialState = {
  userData: {
    userName: '',
    email: '',
    subject: '',
    message: '',
  },
  feedbackError: '',
  modalState: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_FEEDBACK:
      return { ...state, userData: action.feedback };
    case UPDATE_FEEDBACK:
      return { ...state, userData: { ...state.userData, [action.prop]: action.value } };
    case FEEDBACK_ERROR:
      return { ...state, feedbackError: action.feedbackError };
    case TOGGLE_MODAL:
      if (action.modalState === false) return initialState;
      return { ...state, modalState: action.modalState };
    default:
      return state;
  }
};
