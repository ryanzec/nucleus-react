var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Code = require('../../../../assets/components/code.component.jsx');
var testHelper = require('../../../test-helper');
var textGlobals = {};
var code = 'test';
var updatedCode = 'updated';

var UpdateTester = React.createClass({
  getInitialState: function() {
    return {
      code: code
    };
  },

  render: function() {
    return (
      <Code language='js'>{this.state.code}</Code>
    );
  }
})

describe('code component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');

    //mock Prism function to prevent javascript error
    window.Prism = {
      highlightElement: testHelper.noop
    };
  });

  afterEach(function() {
    //reset Prism to undefined
    window.Prism = undefined;
  })

  it('should add correct language css class', function() {
    textGlobals.component = ReactDOM.render(<Code language='js'>{code}</Code>, div);
    var codeElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'code');

    expect(codeElement.className).to.equal('language-js');
  });

  it('should code have proper code', function() {
    textGlobals.component = ReactDOM.render(<Code language='js'>{code}</Code>, div);
    var codeElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'code');

    expect(codeElement.textContent).to.equal(code);
  });

  it('should be able to configure to show line numbers', function() {
    textGlobals.component = ReactDOM.render(<Code language='js' showLineNumbers={true}>{code}</Code>, div);
    var preElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'pre');

    expect(preElement.className).to.equal('line-numbers');
  });

  it('should be able to configure the starting line number if show line numbers is enabled', function() {
    textGlobals.component = ReactDOM.render(<Code language='js' showLineNumbers={true} lineNumberStart={23}>{code}</Code>, div);
    var preElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'pre');

    expect(preElement.getAttribute('data-start')).to.equal('23');
  });

  it('should ignore starting line number configuration if show line numbers is not enabled', function() {
    textGlobals.component = ReactDOM.render(<Code language='js' showLineNumbers={false} lineNumberStart={23}>{code}</Code>, div);
    var preElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'pre');

    expect(preElement.getAttribute('data-start')).to.be.null;
  });

  it('should be able to configure highlighted lines', function() {
    textGlobals.component = ReactDOM.render(<Code language='js' highlightLines='1-3,5,7-10'>{code}</Code>, div);
    var preElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'pre');

    expect(preElement.getAttribute('data-line')).to.equal('1-3,5,7-10');
  });

  it('should be able to configure custom css class for pre element', function() {
    textGlobals.component = ReactDOM.render(<Code language='js' className='custom-pre'>{code}</Code>, div);
    var preElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'pre');

    expect(preElement.className).to.equal('line-numbers custom-pre');
  });

  it('should update code properly', function() {
    textGlobals.component = ReactDOM.render(<UpdateTester />, div);
    textGlobals.component.setState({
      code: updatedCode
    });
    var codeElement = reactTestUtils.findRenderedDOMComponentWithTag(textGlobals.component, 'code');

    expect(codeElement.textContent).to.equal(updatedCode);
  });
});
