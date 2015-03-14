var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var singlePanelComponent = require('../../../../assets/mixins/single-panel.mixin');
var testHelper = require('../../../test-helper');

var TestComponent = React.createClass({
  mixins: [
    singlePanelComponent
  ],

  getInitialState: function() {
    return {
      isActive: false
    }
  },

  singlePanelClose: function() {
    this.setState({
      isActive: false
    });
  },

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

describe('single panel mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should add correct methods to component', function() {
    this.component = React.render(<TestComponent />, div);

    expect(this.component.componentWillMount).is.a('function');
    expect(this.component.onKeyUpDocument).is.a('function');
    expect(this.component.onClickDocument).is.a('function');
  });

  it('should trigger singlePanelClose method on escape key press', function() {
    this.component = React.render(<TestComponent />, div);

    this.component.setState({
      isActive: true
    });

    expect(this.component.state.isActive).to.be.true;

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 27
    }));

    expect(this.component.state.isActive).to.be.false;
  });

  it('should not trigger singlePanelClose method on any key press other then escape', function() {
    this.component = React.render(<TestComponent />, div);

    this.component.setState({
      isActive: true
    });

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 13
    }));

    expect(this.component.state.isActive).to.be.true;
  });

  it('should trigger singlePanelClose method on click', function() {
    this.component = React.render(<TestComponent />, div);

    this.component.setState({
      isActive: true
    });

    expect(this.component.state.isActive).to.be.true;

    document.dispatchEvent(testHelper.createNativeClickEvent({
      eventType: 'HTMLEvents',
      action: 'click'
    }));

    expect(this.component.state.isActive).to.be.false;
  });

  it('should not trigger singlePanelClose method if dontCloseOnClick is set to true and click event triggers', function() {
    this.component = React.render(<TestComponent />, div);

    this.component.setState({
      isActive: true
    });

    expect(this.component.state.isActive).to.be.true;

    this.component.dontCloseOnClick = true;

    document.dispatchEvent(testHelper.createNativeClickEvent({
      eventType: 'HTMLEvents',
      action: 'click'
    }));

    expect(this.component.state.isActive).to.be.true;
  });

  it('should set dontCloseOnClick to false on click event', function() {
    this.component = React.render(<TestComponent />, div);

    this.component.setState({
      isActive: true
    });

    expect(this.component.state.isActive).to.be.true;

    this.component.dontCloseOnClick = true;

    document.dispatchEvent(testHelper.createNativeClickEvent({
      eventType: 'HTMLEvents',
      action: 'click'
    }));

    expect(this.component.dontCloseOnClick).to.be.false;
  });
});
