import * as constants from './application-notifications.constants';

const add = (newNotification) => {
  return (dispatch) => {
    dispatch({
      type: constants.ADD,
      newNotification
    });

    if (newNotification.autoClose) {
      setTimeout(() => {
        dispatch(remove(newNotification.id));
      }, newNotification.autoClose);
    }
  }
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
