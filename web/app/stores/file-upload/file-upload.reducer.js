import immutable from 'immutable';
import * as constants from './file-upload.constants';

const baseData = {
  files: []
};

export default function(state = immutable.fromJS(baseData), action) {
  let newState;

  switch (action.type) {
    case constants.SET:
      newState = state.setIn(['files'], immutable.fromJS(action.files));
      break;

    case constants.CLEAR:
      newState = state.setIn(['files'], state.getIn(['files']).clear());
      break;

    default:
      newState = state;
  }

  return newState;
}
