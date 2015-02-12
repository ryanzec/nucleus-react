var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var ProgressBar = require('../../../../../assets/modules/progress-bar/progress-bar.component.jsx');
var testHelper = require('../../../../test-helper');

describe('progress bar component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should be able to render progress bar', function() {
    this.component = React.render(<ProgressBar />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');
    var progressBarIndicator = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar__indicator');

    expect(progressBar.props.className).to.equal('progress-bar');
    expect(progressBarIndicator.props.className).to.equal('progress-bar__indicator');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<ProgressBar className="m-safe" />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');

    expect(progressBar.props.className).to.equal('progress-bar m-safe');
  });

  it('should be able to add custom styles', function() {
    this.component = React.render(<ProgressBar style={{width: '100px'}} />, div);
    var progressBar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar');

    expect(progressBar.props.style).to.deep.equal({
      width: '100px'
    });
  });

  it('should set indicator width properly', function() {
    this.component = React.render(<ProgressBar percentageDone={50} />, div);
    var progressBarIndicator = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'progress-bar__indicator');

    expect(progressBarIndicator.props.style).to.deep.equal({
      width: '50%'
    });
  });
});
