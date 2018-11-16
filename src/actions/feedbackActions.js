import * as utils from '../utils';

const showFeedbackError = e => (dispatch) => {
  dispatch(utils.errorCatch(e.request || e));
};

export default showFeedbackError;
