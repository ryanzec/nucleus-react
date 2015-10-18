var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var DropDown = require('../../../../assets/components/drop-down.component.jsx');
var testHelper = require('../../../test-helper');
var Fiber = require('fibers');

var PageTest = React.createClass({
  getInitialState: function() {
    return {
      keepActive: false
    }
  },

  render: function() {
    return (
      <DropDown
        className="m-safe"
        handleNode="handle"
        contentNode="content"
        keepActive={this.state.keepActive}
      />
    );
  }
});

describe('drop down component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<DropDown handleNode="handle" contentNode="content" />, div);
    var mainElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down');
    var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
    var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');

    expect(mainElement.props.className).to.equal('drop-down');
    expect(handle.props.children).to.equal('handle');
    expect(content.props.children[2]).to.equal('content');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" />, div);
    var mainElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down');

    expect(mainElement.props.className).to.contain('m-safe');
  });

  it('should be able to specify alignment for content', function() {
    this.component = React.render(<DropDown handleNode="handle" contentNode="content" align="right" />, div);
    var triangle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__triangle');
    var innerTriangle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__triangle-inner');

    expect(triangle.props.className).to.contain('m-right');
    expect(innerTriangle.props.className).to.contain('m-right');
  });

  it('should toggle active when clicking handle', function() {
    this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" />, div);
    var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');

    expect(this.component.isActive()).to.be.false;

    reactTestUtils.Simulate.click(handle);

    expect(this.component.isActive()).to.be.true;

    reactTestUtils.Simulate.click(handle);

    expect(this.component.isActive()).to.be.false;
  });

  it('should deactivate when signle panel method is called', function() {
    this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" />, div);
    var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');

    expect(this.component.isActive()).to.be.false;

    reactTestUtils.Simulate.click(handle);

    this.component.singlePanelClose();

    expect(this.component.isActive()).to.be.false;
  });

  it('should set dont close for single panel when clicking content', function() {
    this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" />, div);
    var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
    var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');

    expect(this.component.dontCloseOnClick).to.be.false;

    reactTestUtils.Simulate.click(handle);
    reactTestUtils.Simulate.click(content);

    expect(this.component.dontCloseOnClick).to.be.true;
  });

  it('should deactivate when clicking content', function(done) {
    Fiber(function() {
      this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" />, div);
      var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
      var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');

      expect(this.component.isActive()).to.be.false;

      reactTestUtils.Simulate.click(handle);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(this.component.isActive()).to.be.true;

      reactTestUtils.Simulate.click(content);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(this.component.isActive()).to.be.false;
      done();
    }).run();
  });

  it('should not deactivate when clicking content', function(done) {
    Fiber(function() {
      this.component = React.render(<DropDown className="m-safe" handleNode="handle" contentNode="content" closeOnContentClick={false} />, div);
      var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
      var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');

      expect(this.component.isActive()).to.be.false;

      reactTestUtils.Simulate.click(handle);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(this.component.isActive()).to.be.true;

      reactTestUtils.Simulate.click(content);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(this.component.isActive()).to.be.true;
      done();
    }).run();
  });

  it('should keep open if is active and keep active is passed', function(done) {
    Fiber(function() {
      this.component = React.render(<PageTest />, div);
      var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
      var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');
      var dropDownComponent = reactTestUtils.findRenderedComponentWithType(this.component, DropDown);

      expect(dropDownComponent.isActive()).to.be.false;

      reactTestUtils.Simulate.click(handle);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(dropDownComponent.isActive()).to.be.true;

      this.component.setState({
        keepActive: true
      });
      reactTestUtils.Simulate.click(content);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(dropDownComponent.isActive()).to.be.true;
      done();
    }).run();
  });

  it('should close if is active and keep active is false', function(done) {
    Fiber(function() {
      this.component = React.render(<PageTest />, div);
      var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
      var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');
      var dropDownComponent = reactTestUtils.findRenderedComponentWithType(this.component, DropDown);

      expect(dropDownComponent.isActive()).to.be.false;

      reactTestUtils.Simulate.click(handle);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(dropDownComponent.isActive()).to.be.true;

      this.component.setState({
        keepActive: true
      });
      reactTestUtils.Simulate.click(content);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(dropDownComponent.isActive()).to.be.true;

      this.component.setState({
        keepActive: false
      });
      reactTestUtils.Simulate.click(content);

      document.dispatchEvent(testHelper.createNativeClickEvent({
        eventType: 'HTMLEvents',
        action: 'click'
      }));

      testHelper.sleep(5);

      expect(dropDownComponent.isActive()).to.be.false;
      done();
    }).run();
  });

  it('should not open if is not active and keep active is passed', function() {
    this.component = React.render(<PageTest />, div);
    var handle = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__handle');
    var content = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'drop-down__content');
    var dropDownComponent = reactTestUtils.findRenderedComponentWithType(this.component, DropDown);

    expect(dropDownComponent.isActive()).to.be.false;

    this.component.setState({
      keepActive: true
    });

    expect(dropDownComponent.isActive()).to.be.false;
  });
});
