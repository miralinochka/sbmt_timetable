import { SEND_FEEDBACK, UPDATE_FEEDBACK } from '../actions/types';

const initialState = {
  userName: '',
  email: '',
  subject: '',
  message: '',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_FEEDBACK:
      return action.feedback;
    case UPDATE_FEEDBACK:
      return { ...state, [action.prop]: action.value };
    default:
      return state;
  }
};
