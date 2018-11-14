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
      return { ...state, userData: action.payload.feedback };
    case UPDATE_FEEDBACK:
      return {
        ...state,
        userData: {
          ...state.userData,
          [action.payload.prop]: action.payload.value,
        },
      };
    case FEEDBACK_ERROR:
      return { ...state, feedbackError: action.payload.feedbackError };
    case TOGGLE_MODAL:
      if (action.modalState === false) return initialState;
      return { ...state, modalState: action.payload.modalState };
    default:
      return state;
  }
};
