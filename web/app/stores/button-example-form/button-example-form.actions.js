import * as constants from './button-example-form.constants';

const set = (formData) => (dispatch) => {
  dispatch({
    type: constants.SET,
    formData
  });
};

const reset = () => ({
  type: constants.RESET,
});

export default {
  set,
  reset
};
