import * as constants from './file-upload.constants';

const set = (files) => (dispatch) => {
  dispatch({
    type: constants.SET,
    files
  });
};

const clear = () => ({
  type: constants.CLEAR,
});

export default {
  set,
  clear
};
