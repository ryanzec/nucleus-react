import * as constants from './application-notifications.constants';

const add = (newNotification) => (dispatch) => {
  dispatch({
    type: constants.ADD,
    newNotification
  });
};

const update = (id, updateData) => ({
  type: constants.UPDATE,
  id,
  updateData
});

const remove = (id) => ({
  type: constants.REMOVE,
  id
});

const clear = () => ({
  type: constants.CLEAR,
});

export default {
  add,
  update,
  remove,
  clear
};
