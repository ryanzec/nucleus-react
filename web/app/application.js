//static resources
import '../index.html';
import './misc/ua-parser';
import './misc/holder';
import './styles/main.scss';
import '../../src/styles/prism.css';
import '../../src/javascript/prism.js';

//NOTE: need this to be an include other wise the configuration is not available in the constructor of components
//TODO: figure out why this need to be an include and document it
//set configuration values
import './configuration-setup';

//application bootstrap
import './router';

import {Promise} from 'bluebird';

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});
