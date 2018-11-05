import { TOGGLE_SPINNER } from './types';

const toggleSpinner = spinnerMode => ({
  type: TOGGLE_SPINNER,
  spinnerMode,
});

export default toggleSpinner;
