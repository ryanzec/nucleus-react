var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var appendBodyMixin = require('../../../../../assets/modules/append-body/append-body.mixin.jsx');
var testHelper = require('../../../../test-helper');

var TestComponent = React.createClass({
  mixins: [
    appendBodyMixin
  ],

  componentDidMount: function() {
    this.createAppendElement();
  },

  componentWillUnmount: function() {
    this.removeAppendElement();
  },

  getAppendBodyContent: function() {
    return (
      <div>Append Content</div>
    );
  },

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

var TestComponentWithDeclaredTag = React.createClass({
  mixins: [
    appendBodyMixin
  ],

  componentDidMount: function() {
    this.createAppendElement({
      tag: 'ul'
    });
  },

  componentWillUnmount: function() {
    this.removeAppendElement();
  },

  getAppendBodyContent: function() {
    return (
      <li>Append Content</li>
    );
  },

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

var TestComponentUpdatable = React.createClass({
  mixins: [
    appendBodyMixin
  ],

  getInitialState: function() {
    return {
      test: ''
    };
  },

  componentDidMount: function() {
    this.createAppendElement();
  },

  componentWillUnmount: function() {
    this.removeAppendElement();
  },

  getAppendBodyContent: function() {
    return (
      <div>Append Content{this.state.test}</div>
    );
  },

  onClick: function() {
    this.setState({
      test: '(updated)'
    });
  },

  render: function() {
    return (
      <div onClick={this.onClick}>Test Component</div>
    );
  }
});

var TestComponentAlreadyAppendedError = React.createClass({
  mixins: [
    appendBodyMixin
  ],

  componentDidMount: function() {
    this.createAppendElement();
    this.createAppendElement();
  },

  componentWillUnmount: function() {
    this.removeAppendElement();
  },

  getAppendBodyContent: function() {
    return (
      <div>Append Content</div>
    );
  },

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

var TestComponentNoAppendContent = React.createClass({
  mixins: [
    appendBodyMixin
  ],

  componentDidMount: function() {
    this.createAppendElement();
  },

  componentWillUnmount: function() {
    this.removeAppendElement();
  },

  getAppendBodyContent: function() {
    return null;
  },

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

describe('append body mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    //make sure to clean up the render component since it does add content to the jsdom document
    testHelper.unmountComponent(this.component);

    //verify everything was cleaned up properly
    expect(document.body.querySelectorAll('*').length).to.equal(0);
  });

  it('should append an element to the body', function() {
    this.component = React.render(<TestComponent />, div);

    expect(document.querySelectorAll('body div.append-body-wrapper').length).to.equal(1);
    expect(document.querySelectorAll('body div.append-body-wrapper div')[0].outerHTML).to.match(/<div data-reactid="([a-zA-Z0-9\.]*)">Append Content<\/div>/);
  });

  it('should remove the appended element from the body', function() {
    this.component = React.render(<TestComponent />, div);

    testHelper.unmountComponent(this.component);

    expect(document.querySelectorAll('body div.append-body-wrapper').length).to.equal(0);
  });

  it('should be able to define the tag used to append the element to the body', function() {
    this.component = React.render(<TestComponentWithDeclaredTag />, div);

    expect(document.querySelectorAll('body ul.append-body-wrapper').length).to.equal(1);
  });

  it('should update append element when component is updated', function() {
    this.component = React.render(<TestComponentUpdatable />, div);

    expect(document.querySelectorAll('body div.append-body-wrapper div')[0].outerHTML).to.not.contain('(updated)');

    React.addons.TestUtils.Simulate.click(this.component.getDOMNode());

    expect(document.querySelectorAll('body div.append-body-wrapper div')[0].outerHTML).to.contain('(updated)');
  });

  it('should throw error if attempting to create append element multiple times for one component', function() {
    expect(function() {
      this.component = React.render(<TestComponentAlreadyAppendedError />, div);
    }).to.throw('Component has already append an element to the body');

    //need to manually cleanup since the error was thrown
    document.body.removeChild(document.querySelector('body div.append-body-wrapper'));
  });

  it('should render noscript if not content is returned to render in appended element', function() {
    this.component = React.render(<TestComponentNoAppendContent />, div);

    expect(document.querySelectorAll('body div.append-body-wrapper')[0].innerHTML).to.match(/<noscript data-reactid="([a-zA-Z0-9\.]*)"><\/noscript>/);
  });

  it('should be able to retrieve the append dom element', function() {
    this.component = React.render(<TestComponent />, div);

    expect(document.querySelectorAll('body div.append-body-wrapper')[0]).to.deep.equal(this.component.getAppendElement());
  });
});
