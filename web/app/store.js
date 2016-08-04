import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import preventDoubleClick from './stores/prevent-double-click/prevent-double-click.reducer';
import menu from './stores/menu/menu.reducer';
import applicationNotifications from '../../src/stores/application-notifications/application-notifications.reducer';
import fileUploadForm from './stores/file-upload-form/file-upload-form.reducer';
import buttonExampleForm from './stores/button-example-form/button-example-form.reducer';

let myReducers = {
  preventDoubleClick,
  menu,
  applicationNotifications,
  fileUploadForm,
  buttonExampleForm
};

let reducers = {};

Object.assign(reducers, myReducers, {
  routing: routerReducer
});

export default createStore(combineReducers(reducers), applyMiddleware(thunk));
