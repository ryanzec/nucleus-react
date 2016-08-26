import * as constants from './dynamically-loading-components.constants';

//NOTE: importing the direct file for some reason results in an error (https://github.com/lodash/lodash/issues/2599)
// import cloneDeep from 'lodash/cloneDeep';
import {cloneDeep} from 'lodash';

let dataSets = {
  one: [],
  two: [],
  three: [],
};

export default function(state = dataSets, action) {
  let newState = cloneDeep(state);

  switch (action.type) {
    case constants.SET:
      newState[action.dataSetName] = action.dataSet;
      break;
  }

  return newState;
};
