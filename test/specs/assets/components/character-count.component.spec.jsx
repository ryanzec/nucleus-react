var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var CharacterCounter = require('../../../../assets/components/character-counter.component.jsx');
var testHelper = require('../../../test-helper');
var sinon = require('sinon');

var maxLimit = 100;
var input0 = '';
var input50 = '12345678901234567890123456789012345678901234567890';
var input75 = '123456789012345678901234567890123456789012345678901234567890123456789012345';
var input99 = '123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789';
var input100 = '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';
var input101 = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901';
var input110 = '12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890';

var TextComponent = React.createClass({
  getInitialState: function() {
    return {
      value: '',
      isDisabled: false
    };
  },

  onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },

  onOverLimit: function() {
    this.setState({
      isDisabled: true
    });
  },

  onUnderLimit: function() {
    this.setState({
      isDisabled: false
    });
  },

  render: function() {
    return (
      <span>
        <input type="text" value={this.state.value} onChange={this.onChange} />
        <CharacterCounter
          input={this.state.value}
          maxLimit={maxLimit}
          onOverLimit={this.onOverLimit}
          onUnderLimit={this.onUnderLimit} />
        <button disabled={this.state.isDisabled}>Submit</button>
      </span>
    );
  }
});

describe('character counter component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    callbackValue = null;
  });

  describe('output text', function() {
    it('should be able to handle when you have 2 or more characters left', function() {
      this.component = React.render(<CharacterCounter input={input0} maxLimit={maxLimit} />, div);
      var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

      expect(characterCounter.props.children).to.equal('You have 100 characters left');
    });

    it('should be able to handle when you have 1 character left', function() {
      this.component = React.render(<CharacterCounter input={input99} maxLimit={maxLimit} />, div);
      var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

      expect(characterCounter.props.children).to.equal('You have 1 character left');
    });

    it('should be able to handle when you have 0 characters left', function() {
      this.component = React.render(<CharacterCounter input={input100} maxLimit={maxLimit} />, div);
      var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

      expect(characterCounter.props.children).to.equal('You have 0 characters left');
    });

    it('should be able to handle when you are 1 character over the limit', function() {
      this.component = React.render(<CharacterCounter input={input101} maxLimit={maxLimit} />, div);
      var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

      expect(characterCounter.props.children).to.equal('You are 1 character over the limit');
    });

    it('should be able to handle when you are 2 characters or more over the limit', function() {
      this.component = React.render(<CharacterCounter input={input110} maxLimit={maxLimit} />, div);
      var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

      expect(characterCounter.props.children).to.equal('You are 10 characters over the limit');
    });
  });

  it('should be able to render character counter', function() {
    this.component = React.render(<CharacterCounter input={input0} maxLimit={maxLimit} />, div);
    var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

    expect(characterCounter.props.className).to.equal('character-counter');
    expect(this.component.state.previousStatus).to.equal('under');
  });

  it('should set previous status to over if the initial input is over the limit', function() {
    this.component = React.render(<CharacterCounter input={input110} maxLimit={maxLimit} />, div);
    var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

    expect(this.component.state.previousStatus).to.equal('over');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<CharacterCounter input={""} maxLimit={maxLimit} className="m-safe" />, div);
    var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

    expect(characterCounter.props.className).to.equal('character-counter m-safe');
  });

  it('should add m-warning class when the input in over the warning limit', function() {
    this.component = React.render(<CharacterCounter input={input75} maxLimit={maxLimit} />, div);
    var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

    expect(characterCounter.props.className).to.equal('character-counter m-warning');
  });

  it('should add m-over class when the input in over the warning limit', function() {
    this.component = React.render(<CharacterCounter input={input110} maxLimit={maxLimit} />, div);
    var characterCounter = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'character-counter');

    expect(characterCounter.props.className).to.equal('character-counter m-over');
  });

  it('should transition from under to over when the going over the limit', function() {
    this.component = React.render(<TextComponent />, div);
    var characterCounter = reactTestUtils.findRenderedComponentWithType(this.component, CharacterCounter);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    expect(characterCounter.state.previousStatus).to.equal('over');
  });

  it('should transition from over to under when coming under the limit', function() {
    this.component = React.render(<TextComponent />, div);
    var characterCounter = reactTestUtils.findRenderedComponentWithType(this.component, CharacterCounter);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input99
      }
    });

    expect(characterCounter.state.previousStatus).to.equal('under');
  });

  it('should execute onOverLimit callback when the text transitions from under to over status', function() {
    this.component = React.render(<TextComponent />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    expect(button.props.disabled).to.be.true;
  });

  it('should execute onOverLimit callback when the text transitions from under to over status just once', function() {
    this.component = React.render(<TextComponent />, div);
    var spy = sinon.spy(this.component, 'onOverLimit');
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input110
      }
    });

    expect(spy).to.have.callCount(1);

    this.component.onOverLimit.restore();
  });

  it('should execute onUnderLimit callback when the text transitions from over to under status', function() {
    this.component = React.render(<TextComponent />, div);
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input99
      }
    });

    expect(button.props.disabled).to.be.false;
  });

  it('should execute onUnderLimit callback when the text transitions from over to under status just once', function() {
    this.component = React.render(<TextComponent />, div);
    var spy = sinon.spy(this.component, 'onUnderLimit');
    var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');
    var button = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'button');

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input101
      }
    });

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input100
      }
    });

    reactTestUtils.Simulate.change(input, {
      target: {
        value: input99
      }
    });

    expect(spy).to.have.callCount(1);

    this.component.onUnderLimit.restore();
  });
});
