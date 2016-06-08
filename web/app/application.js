//static resources
import '../index.html';
import './misc/ua-parser';
import './misc/holder';
import './styles/main.scss';
import '../../src/styles/prism.css';
import '../../src/javascript/prism.js';

//application bootstrap
import './router';

import {Promise} from 'bluebird';

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});
