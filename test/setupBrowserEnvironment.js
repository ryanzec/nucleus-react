import browserEnv from 'browser-env';
import MockWebStorage from 'mock-webstorage';
import raf from 'raf';
import enzyme from 'enzyme';
import Adapter from 'enzyme-apapter-react-16';

browserEnv();

window.Date = global.Date;

const appendElement = document.createElement('div');
appendElement.classList.add('append-element');
document.body.appendChild(appendElement);

global.requestAnimationFrame = window.requestAnimationFrame = raf;
global.localStorage = window.localStorage = new MockWebStorage();
global.sessionStorage = window.sessionStorage = new MockWebStorage();

enzyme.configure({
  adapter: new Adapter(),
});
