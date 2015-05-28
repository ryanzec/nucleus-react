//NOTE: there are some visual aspects to this component that can't be test with mocha/chai/jsdom
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var InputAutoSizer = require('../../../../assets/components/input-auto-sizer.component.jsx');
var testHelper = require('../../../test-helper');

describe('input auto sizer component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('text input', function() {
    it('should render', function() {
      this.component = React.render(<InputAutoSizer />, div);
      var inputAutoSizer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'input-auto-sizer');

      expect(inputAutoSizer.props.children.length).to.equal(3);
      expect(inputAutoSizer.props.children[0].type).to.equal('div');
      expect(inputAutoSizer.props.children[1].type).to.equal('input');
      expect(inputAutoSizer.props.children[2].type).to.equal('div');
    });

    it('should be able to add custom class to input element', function() {
      this.component = React.render(<InputAutoSizer inputClassName="m-safe" defaultValue="coverage" />, div);
      var inputAutoSizer = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'input-auto-sizer');

      expect(inputAutoSizer.props.children[1].props.className).to.equal('form-element__input m-text m-safe');
    });

    it('should be able to add specify type', function() {
      this.component = React.render(<InputAutoSizer type="password" inputClassName="m-safe" defaultValue="coverage" />, div);
      var input = reactTestUtils.findRenderedDOMComponentWithTag(this.component, 'input');

      expect(input.props.type).to.equal('password');
    });
  });
});
