import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import preventDoubleClick from './prevent-double-click/prevent-double-click.reducer';
import menu from './menu/menu.reducer';
import applicationNotifications from './application-notifications/application-notifications.reducer';

let myReducers = {
  preventDoubleClick,
  menu,
  applicationNotifications
};

let reducers = {};

Object.assign(reducers, myReducers, {
  routing: routerReducer
});

export default createStore(combineReducers(reducers), applyMiddleware(thunk));
