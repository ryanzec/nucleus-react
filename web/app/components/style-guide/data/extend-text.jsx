var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var SvgIcon = nucleusReact.components.SvgIcon;
var ExtendText = nucleusReact.components.ExtendText;
var bluebird = require('bluebird');
var request = require('superagent');

var noop = function(){};
var getData = function(value) {
  var defer = bluebird.defer();
  var url = '/query';

  if (value) {
    url += '/' + value;
  }

  request.get(url, function desktopComponentOnGetUserRequest(err, response) {
    var formattedData = [];

    if (response.body.data.results.length > 0) {
      response.body.data.results.forEach(function(item) {
        formattedData.push(item);
      });
    }

    defer.resolve(formattedData);
  });

  return defer.promise;
};

var ExtendsTextTaggingAllowFreeForm = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} />
    );
  }
});

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
      <ExtendText onChange={noop} getData={getData} debounce={200} characterThreshold={3} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Free form tagging',
    example: (
      <ExtendsTextTaggingAllowFreeForm />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'validation',
    example: (
      <ExtendText renderValidation="both" validateOnLoad={true} validators={
        [{
          validator: function(value) {
            if (value) {
              return value.value === 'd';
            }

            return false;
          }
        }]} onChange={noop} getData={getData} characterThreshold={3} debounce={200} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }],
  notes: [(
    <span>The getData property must return a promise (may I recommend the bluebird library)</span>
  )]
};
