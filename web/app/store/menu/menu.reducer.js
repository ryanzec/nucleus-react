import * as constants from './menu.constants';
import immutable from 'immutable';

let menuData = immutable.fromJS({
  menu: [{
    display: 'Style Guide',
    items: [{
      id: 'style-guide-alerts',
      display: 'Alerts',
      to: '/style-guide/alerts'
    }, {
      id: 'style-guide-list-breadcrumbs',
      display: 'Breadcrumbs',
      to: '/style-guide/breadcrumbs'
    }, {
      id: 'style-guide-buttons',
      display: 'Buttons',
      to: '/style-guide/buttons'
    }, {
      id: 'style-guide-cards',
      display: 'Cards',
      to: '/style-guide/cards'
    }, {
      id: 'style-guide-date-picker',
      display: 'Date Picker',
      to: '/style-guide/date-picker'
    }, {
      id: 'style-guide-code',
      display: 'Code',
      to: '/style-guide/code'
    }, {
      id: 'style-guide-drop-downs',
      display: 'Drop Downs',
      to: '/style-guide/drop-downs'
    }, {
      id: 'style-guide-forms',
      display: 'Forms',
      to: '/style-guide/forms'
    }, {
      id: 'style-guide-grid',
      display: 'Grid',
      to: '/style-guide/grid'
    }, {
      id: 'style-guide-labels',
      display: 'Labels',
      to: '/style-guide/labels'
    }, {
      id: 'style-guide-list-groups',
      display: 'List Groups',
      to: '/style-guide/list-groups'
    }, {
      id: 'style-guide-list-modals',
      display: 'Modals',
      to: '/style-guide/modals'
    }, {
      id: 'style-guide-list-navigation',
      display: 'Navigation',
      to: '/style-guide/navigation'
    }, {
      id: 'style-guide-overlays',
      display: 'Overlays',
      to: '/style-guide/overlays'
    }, {
      id: 'style-guide-list-pagination',
      display: 'Pagination',
      to: '/style-guide/pagination'
    }, {
      id: 'style-guide-list-popovers',
      display: 'Popovers',
      to: '/style-guide/popovers'
    }, {
      id: 'style-guide-list-progress-bars',
      display: 'Progress Bars',
      to: '/style-guide/progress-bars'
    }, {
      id: 'style-guide-list-select',
      display: 'Select',
      to: '/style-guide/select'
    }, {
      id: 'style-guide-list-tooltips',
      display: 'Tooltips',
      to: '/style-guide/tooltips'
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
