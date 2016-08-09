import * as constants from './dynamically-loading-components.constants';

export const set = (dataSetName, dataSet) => {
  return {
    type: constants.SET,
    dataSetName,
    dataSet
  };
};
