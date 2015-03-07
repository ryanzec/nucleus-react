var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var SvgIcon = nucleusReact.components.SvgIcon;
var ExtendText = nucleusReact.components.ExtendText;
var bluebird = require('bluebird');

var data = [{
  display: 'test 1',
  value: 'test1'
}, {
  display: 'test 2',
  value: 'test2'
}, {
  display: 'test 3',
  value: 'test3'
}];
var noop = function(){};
var getData = function() {
  var defer = bluebird.defer();

  defer.resolve(data);

  return defer.promise;
};

var getDeleyData = function() {
  var defer = bluebird.defer();

  setTimeout(function() {
    defer.resolve(data);
  }, 2000);

  return defer.promise;
};

module.exports = {
  name: 'Extend Text',
  type: 'component',
  overview: (
    <p>
      This component provides an extend text box.  It provide auto complete functionality.
    </p>
  ),
  properties: [{
    type: 'function',
    name: 'onChange',
    defaultValue: 'null',
    description: 'A callback to execute when the value changes.'
  }, {
    type: 'string',
    name: 'defaultValue',
    defaultValue: 'null',
    description: 'The initial value to use.'
  }, {
    type: 'boolean',
    name: 'autoHeightResize',
    defaultValue: 'true',
    description: 'Whether or not the input element should auto resize with the content.'
  }, {
    type: 'object',
    name: 'emptyIndicator',
    defaultValue: '<span>No Options Found</span>',
    description: 'The element to use to indicate the auto complete could not find an options.'
  }, {
    type: 'boolean',
    name: 'allowFreeForm',
    defaultValue: 'false',
    description: 'Whether or not to allow a value that is not an option in the auto complete list.'
  }, {
    type: 'object',
    name: 'newIndicator',
    defaultValue: '<span>New</span>',
    description: 'The element to use to indicate the current value is a new value.'
  }, {
    type: 'string',
    name: 'displayProperty',
    defaultValue: 'display',
    description: 'The property of the object to use as the display value in the auto complete list.'
  }, {
    type: 'object',
    name: 'loadingIndicator',
    defaultValue: '<span>Loading...</span>',
    description: 'The element to use to indicate the auto complete list is waiting for the data to return.'
  }, {
    type: 'number',
    name: 'characterThreshold',
    defaultValue: '0',
    description: 'The number of character that must be reached before requesting auto complete list.'
  }, {
    type: 'number',
    name: 'debounce',
    defaultValue: '0',
    description: 'The number of milliseconds to wait before requesting for data between key stroke in the input field.'
  }, {
    type: 'boolean',
    name: 'loadingIndicatorEnabled',
    defaultValue: 'true',
    description: 'Whether or not to display the loading indicator when wait for data.'
  }, {
    type: 'boolean',
    name: 'preloadData',
    defaultValue: 'false',
    description: 'Whether or not to preload with data.'
  }, {
    type: 'boolean',
    name: 'taggingEnabled',
    defaultValue: 'false',
    description: 'Whether or not to enable tagging.'
  }],
  examples: [{
    description: 'Standard',
    example: (
      <ExtendText onChange={noop} getData={getData} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'free form allowed',
    example: (
      <span>
        <ExtendText onChange={noop} getData={getData} allowFreeForm={true} /><ExtendText onChange={noop} getData={getData} allowFreeForm={true} />
      </span>
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Tagging',
    example: (
      <ExtendText onChange={noop} getData={getData} taggingEnabled={true} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Tagging free form (with debounce set)',
    example: (
      <span>
        <ExtendText onChange={noop} getData={getDeleyData} taggingEnabled={true} allowFreeForm={true} debounce={1000} /><ExtendText onChange={noop} getData={getDeleyData} taggingEnabled={true} allowFreeForm={true} debounce={1000} />
      </span>
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }],
  notes: [(
    <span>The getData property must return a promise (may I recommend the bluebird library)</span>
  )]
};
