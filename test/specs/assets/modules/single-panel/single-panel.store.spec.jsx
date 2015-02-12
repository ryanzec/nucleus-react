var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;

var ProgressBar = require('../../../../../assets/modules/single-panel/single-panel.store');

var singlePanelActions = require('fluxe').getActions(require('../../../../../assets/modules/single-panel/single-panel.store.js').storeName);
var singlePanelStore = require('fluxe').getStore(require('../../../../../assets/modules/single-panel/single-panel.store.js').storeName);
var testHelper = require('../../../../test-helper');

var SinglePanelComponent1 = React.createClass({
  getInitialState: function() {
    return {
      isActive: false
    };
  },

  componentDidMount: function() {
    singlePanelActions.registerComponent({
      component: this
    });
  },

  componentWillUnmount: function() {
    singlePanelActions.unregisterComponent({
      component: this
    });
  },

  hideSinglePanel: function() {
    this.setState({
      isActive: false
    })
  },

  onClick: function() {
    this.setState({
      isActive: !this.state.isActive
    });
  },

  render: function() {
    return (
      <div onClick={this.onClick}>Test</div>
    );
  }
});

describe('single panel store', function() {
  beforeEach(function() {
    singlePanelActions.registerGlobalEventHandler();
  });

  afterEach(function() {
    //make sure to clean up the render component since it does add content to the jsdom document
    testHelper.unmountComponent(this.component);

    //make sure there are no linger elements on the body
    expect(document.body.querySelectorAll('*').length).to.equal(0);
    singlePanelActions.unregisterGlobalEventHandler();
  });

  it('should be able to register component', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);

    expect(singlePanelStore._internalData.registeredComponents.indexOf(this.component)).to.equal(0);
  });

  it('should be able to unregister component', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    testHelper.unmountComponent(this.component);

    expect(singlePanelStore._internalData.registeredComponents.indexOf(this.component)).to.equal(-1);
  });

  it('should respond to click event', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    expect(this.component.state.isActive).to.be.true;

    document.dispatchEvent(testHelper.createNativeClickEvent({
      eventType: 'HTMLEvents',
      action: 'click'
    }));

    expect(this.component.state.isActive).to.be.false;
  });

  it('should respond to keyup event for escape key', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 27
    }));

    expect(this.component.state.isActive).to.be.false;
  });

  it('should not respond to keyup event for any key other than escape key', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 13
    }));

    expect(this.component.state.isActive).to.be.true;
  });

  it('should be able to prevent a component from being closed on click event', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    singlePanelActions.setClickedComponent({
      component: this.component
    });

    document.dispatchEvent(testHelper.createNativeClickEvent({
      eventType: 'HTMLEvents',
      action: 'click'
    }));

    expect(this.component.state.isActive).to.be.true;
  });

  it('should not be able to prevent a component from being closed on keyup event', function() {
    this.component = React.render(<SinglePanelComponent1 />, document.body);
    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    singlePanelActions.setClickedComponent({
      component: this.component
    });

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 27
    }));

    expect(this.component.state.isActive).to.be.false;
  });
});
