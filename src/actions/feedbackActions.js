import {
  SEND_FEEDBACK, UPDATE_FEEDBACK, FEEDBACK_ERROR, TOGGLE_MODAL,
} from './types';
import * as api from '../api';

export const sendFeedback = feedback => async (dispatch) => {
  await api.postFeedback(feedback);
  dispatch({
    type: SEND_FEEDBACK,
    feedback,
  });
};

export const updateFeedback = (prop, value) => ({
  type: UPDATE_FEEDBACK,
  prop,
  value,
});

export const setFeedbackError = feedbackError => ({
  type: FEEDBACK_ERROR,
  feedbackError,
});

export const toggleModal = modalState => ({
  type: TOGGLE_MODAL,
  modalState,
});