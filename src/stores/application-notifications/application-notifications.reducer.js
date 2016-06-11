import immutable from 'immutable';
import * as constants from './application-notifications.constants';

const baseData = {
  notifications: []
};

export default function(state = immutable.fromJS(baseData), action) {
  let newState;

  switch (action.type) {
    case constants.ADD:
      newState = state.setIn(['notifications'], state.getIn(['notifications']).push(immutable.fromJS(action.newNotification)));
      break;

    case constants.UPDATE:
      newState = state.setIn(['notifications'], state.getIn(['notifications']).map((notification) => {
        if (notification.get('id') === action.id) {
          return notification.merge(action.updateData);
        }

        return notification;
      }));
      break;

    case constants.REMOVE:
      newState = state.setIn(['notifications'], state.getIn(['notifications']).filter((notification) => notification.get('id') !== action.id));
      break;

    case constants.CLEAR:
      newState = state.setIn(['notifications'], state.getIn(['notifications']).clear());
      break;

    default:
      newState = state;
  }

  return newState;
}
