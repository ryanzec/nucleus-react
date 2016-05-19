//static resources
import '../index.html';
import './misc/ua-parser';
import './misc/holder';
import './styles/main.scss';
import '../../node_modules/react-datepicker/dist/react-datepicker.css';
import '../../node_modules/react-select/dist/react-select.css';
import '../../assets/styles/prism.css';
import '../../assets/javascript/prism.js';

//application bootstrap
import './router.jsx';

import {Promise} from 'bluebird';

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});
