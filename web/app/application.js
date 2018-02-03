//static resources
import './styles/main.scss';

//NOTE: need this to be an include other wise the configuration is not available in the constructor of components
//TODO: figure out why this need to be an include and document it
//set configuration values
import './configurationSetup';

//application bootstrap
import './router';

import {Promise} from 'bluebird';

Promise.onPossiblyUnhandledRejection((error) => {
  throw error;
});
