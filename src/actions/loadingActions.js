import { TOGGLE_SPINNER } from './types';

const toggleSpinner = spinnerMode => ({
  type: TOGGLE_SPINNER,
  payload: { spinnerMode },
});

export default toggleSpinner;
