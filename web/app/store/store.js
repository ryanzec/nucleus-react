import {
  createStore,
  combineReducers
} from 'redux';
import {routerReducer} from 'react-router-redux';

import preventDoubleClick from './prevent-double-click/prevent-double-click.reducer';
import menu from './menu/menu.reducer';

let myReducers = {
  preventDoubleClick,
  menu
};

let reducers = {};

Object.assign(reducers, myReducers, {
  routing: routerReducer
});

export default createStore(combineReducers(reducers));
