//NOTE: setup expect as global
import {expect} from 'chai';

global.expect = expect;

//NOTE: setup JSDOM for test running
import * as jsdom from 'jsdom';

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom.jsdom('');
global.window = document.defaultView;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

//NOTE: need to include the i18n testing file
global.window.i18n = require('./i18n-node.js');

//NOTE: include all files that should have coverage numbers on them in-case there are files the specs don't trigger inclusion
import globArray from 'glob-array';

//NOTE: if you want to exclude a files that is include by the tests itself, you need to define that exclude in a .istanbul.yml file
var filesForCoverage = [
  process.cwd() + '/assets/**/*.js',
  process.cwd() + '/assets/**/*.jsx'
];

globArray.sync(filesForCoverage).forEach(function(filePath) {
  require(filePath);
});
