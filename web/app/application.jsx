//static resources
import '../index.html';
import './misc/ua-parser';
import './misc/holder';
import './styles/main.scss';
import '../../assets/styles/prism.css';
import '../../assets/javascript/prism.js';

//application bootstrap
import './router.jsx';

import {Promise} from 'bluebird';

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});
