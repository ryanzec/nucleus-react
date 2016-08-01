import * as constants from './file-upload-form.constants';

const set = (formData) => (dispatch) => {
  dispatch({
    type: constants.SET,
    formData
  });
};

const reset = () => ({
  type: constants.RESET,
});

const validate = () => ({
  type: constants.VALIDATE,
});

export default {
  set,
  reset,
  validate
};
