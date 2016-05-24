import * as constants from './menu.constants';
import immutable from 'immutable';

let menuData = immutable.fromJS({
  menu: [{
    display: 'Style Guide',
    items: [{
      id: 'style-guide-buttons',
      display: 'Buttons',
      to: '/style-guide/buttons'
    }, {
      id: 'style-guide-cards',
      display: 'Cards',
      to: '/style-guide/cards'
    }, {
      id: 'style-guide-code',
      display: 'Code',
      to: '/style-guide/code'
    }, {
      id: 'style-guide-colors',
      display: 'Colors',
      to: '/style-guide/colors'
    }, {
      id: 'style-guide-overlays',
      display: 'Overlays',
      to: '/style-guide/overlays'
    }, {
      id: 'style-guide-grid',
      display: 'Grid',
      to: '/style-guide/grid'
    }, {
      id: 'style-guide-progress-bars',
      display: 'Progress Bars',
      to: '/style-guide/progress-bars'
    }, {
      id: 'style-guide-svg-icons',
      display: 'SVG Icons',
      to: '/style-guide/svg-icons'
    }, {
      id: 'style-guide-modals',
      display: 'Modals',
      to: '/style-guide/modals'
    }, {
      id: 'style-guide-typography',
      display: 'Typography',
      to: '/style-guide/typography'
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
