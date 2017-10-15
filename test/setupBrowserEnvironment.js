import browserEnv from 'browser-env';

browserEnv();

const appendElement = document.createElement('div');
appendElement.classList.add('append-element');
document.body.appendChild(appendElement);
