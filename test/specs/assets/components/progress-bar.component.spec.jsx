var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var ProgressBar = require('../../../../assets/components/progress-bar.component.jsx');
var testHelper = require('../../../test-helper');

describe('progress bar component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render progress bar', function() {
    this.component = ReactDOM.render(<ProgressBar />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');
    var progressBarIndicator = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar__indicator');

    expect(progressBar.className).to.equal('progress-bar');
    expect(progressBarIndicator.className).to.equal('progress-bar__indicator');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<ProgressBar className="m-safe" />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');

    expect(progressBar.className).to.equal('progress-bar m-safe');
  });

  it('should be able to add custom styles', function() {
    this.component = ReactDOM.render(<ProgressBar style={{width: '100px'}} />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');

    expect(progressBar.style.width).to.equal('100px');
  });

  it('should set indicator width properly', function() {
    this.component = ReactDOM.render(<ProgressBar percentageDone={50} />, div);
    var progressBarIndicator = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar__indicator');

    expect(progressBarIndicator.style.width).to.equal('50%');
  });
});
