import * as constants from './prevent-double-click.constants';

export const enable = () => {
  return {
    type: constants.ENABLE
  };
};

export const disable = () => {
  return {
    type: constants.DISABLE
  };
};