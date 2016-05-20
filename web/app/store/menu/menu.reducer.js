import * as constants from './menu.constants';
import immutable from 'immutable';

let menuData = immutable.fromJS({
  menu: [{
    display: 'Style Guide',
    items: [{
      id: 'style-guide-code',
      display: 'Code',
      to: '/style-guide/code'
    }, {
      id: 'style-guide-overlays',
      display: 'Overlays',
      to: '/style-guide/overlays'
    }, {
      id: 'style-guide-svg-icons',
      display: 'SVG Icons',
      to: '/style-guide/svg-icons'
    }]
  }],
  activeMenu: 'style-guide-alerts'
});

export default function(state, action) {
  if (typeof state === 'undefined') {
    return menuData;
  }

  let newState;

  switch (action.type) {
    case constants.SET_ACTIVE:
      newState = state.setIn('activeMenu', action.activeMenu);
      break;

    default:
      newState = state;
  }

  return newState;
};
