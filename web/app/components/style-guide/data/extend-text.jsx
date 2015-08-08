var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var SvgIcon = nucleusReact.components.SvgIcon;
var ExtendText = nucleusReact.components.ExtendText;
var bluebird = require('bluebird');
var request = require('superagent');

var staticData = [{
  display: 'ASP.NET (Yuck!)',
  value: 'asp.net'
}, {
  display: 'C#',
  value: 'c-sharp'
}, {
  display: 'Go',
  value: 'golang'
}, {
  display: 'Groovy',
  value: 'groovy'
}, {
  display: 'Java',
  value: 'java'
}, {
  display: 'JavaScript',
  value: 'js'
}, {
  display: 'PHP',
  value: 'php'
}, {
  display: 'Python',
  value: 'python'
}, {
  display: 'Rust',
  value: 'rust'
}];
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

var getDataDelayed = function(value) {
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

    setTimeout(function() {
      defer.resolve(formattedData);
    }, 3000);
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
      <ExtendText
        dropDownIconFragment="chevron-down"
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getData}
        taggingEnabled={true}
        allowFreeForm={true}
      />
    );
  }
});

var ExtendsTextTaggingAllowFreeFormThreshold = React.createClass({
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
      <ExtendText
        dropDownIconFragment="chevron-down"
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getDataDelayed}
        taggingEnabled={true}
        allowFreeForm={true}
        characterThreshold={1}
      />
    );
  }
});

var ExtendsTextTaggingAllowFreeFormWithThreshold = React.createClass({
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
      <ExtendText
        dropDownIconFragment="chevron-down"
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getData}
        taggingEnabled={true}
        allowFreeForm={true}
        characterThreshold={1}
      />
    );
  }
});

var ExtendsTextTaggingStaticData = React.createClass({
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
      <ExtendText placeholder="Placeholder" onChange={this.onExtendTextChange} staticData={staticData} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} />
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
  properties: [],
  examples: [{
    description: 'Standard',
    example: (
      <ExtendText label="My Label" placeholder="My Placeholder" onChange={noop} getData={getData} debounce={500} characterThreshold={3} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: '1 character threshold free form',
    example: (
      <ExtendsTextTaggingAllowFreeFormThreshold />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Free form tagging',
    example: (
      <ExtendsTextTaggingAllowFreeForm />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Free form tagging with threshold',
    example: (
      <ExtendsTextTaggingAllowFreeFormWithThreshold />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'validation',
    example: (
      <ExtendText renderValidation="both" validators={
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
  }, {
    description: 'static data (no filter)',
    example: (
      <ExtendText onChange={noop} staticDataFilter={function(value, data){return data}} staticData={[{
        display: 'ASP.NET (Yuck!)',
        value: 'asp.net'
      }, {
        display: 'C#',
        value: 'c-sharp'
      }, {
        display: 'Go',
        value: 'golang'
      }, {
        display: 'Groovy',
        value: 'groovy'
      }, {
        display: 'Java',
        value: 'java'
      }, {
        display: 'JavaScript',
        value: 'js'
      }, {
        display: 'PHP',
        value: 'php'
      }, {
        display: 'Python',
        value: 'python'
      }, {
        display: 'Rust',
        value: 'rust'
      }]} />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'static data tagging',
    example: (
      <ExtendsTextTaggingStaticData />
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }],
  notes: [(
    <span>The getData property must return a promise (may I recommend the bluebird library)</span>
  )]
};
