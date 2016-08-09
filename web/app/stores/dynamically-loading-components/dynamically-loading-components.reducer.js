import * as constants from './dynamically-loading-components.constants';
import clone from 'lodash/cloneDeep';

let dataSets = {
  one: [],
  two: [],
  three: [],
};

export default function(state = dataSets, action) {
  let newState = clone(state);

  switch (action.type) {
    case constants.SET:
      newState[action.dataSetName] = action.dataSet;
      break;
  }

  return newState;
};
