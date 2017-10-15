import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import menu from './stores/menu/menu.reducer';
import preventDoubleClick from './stores/prevent-double-click/prevent-double-click.reducer';
import applicationNotifications from '../../src/stores/application-notifications/application-notifications.reducer';
import fileUploadForm from './stores/file-upload-form/file-upload-form.reducer';
import buttonExampleForm from './stores/button-example-form/button-example-form.reducer';
import dynamicallyLoadingComponents from './stores/dynamically-loading-components/dynamically-loading-components.reducer';

const reduxMiddleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
  const reduxFreeze = require('redux-freeze');

  reduxMiddleware.push(reduxFreeze);
}

const reducers = combineReducers({
  menu,
  preventDoubleClick,
  applicationNotifications,
  fileUploadForm,
  buttonExampleForm,
  dynamicallyLoadingComponents,
  routing: routerReducer,
});
const middleware = applyMiddleware(...reduxMiddleware);

export default createStore(reducers, middleware);
