import {render} from 'react-dom';
import routes from './routes';
import { createClient } from 'service-mocker/client';

const client = createClient('javascript/mocker/server.js');

client.ready.then(() => {
  render(routes, document.querySelector('.react-bootstrap-element'));
});
