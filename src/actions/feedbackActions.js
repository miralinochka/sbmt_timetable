import { SEND_FEEDBACK, UPDATE_FEEDBACK } from './types';

export const sendFeedback = feedback => ({
  type: SEND_FEEDBACK,
  feedback,
});

export const updateFeedback = ({ prop, value }) => ({
  type: UPDATE_FEEDBACK,
  prop,
  value,
});
