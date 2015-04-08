var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var RadioInput = require('../../../../assets/components/radio-input.component.jsx');
var testHelper = require('../../../test-helper');
var iconData = require('nucleus-icons');
var _ = require('lodash');

var validateTrue = function() {
  return true;
};

var validateFalse = function() {
  return false;
};

var getOptions = function() {
  return [{
    display: 'Option 1',
    value: 1
  }, {
    display: 'Option 2',
    value: 'two'
  }];
};

var getOptionsLeft = function() {
  return [{
    display: 'Option 1',
    value: 1,
    displayPosition: 'left'
  }, {
    display: 'Option 2',
    value: 'two',
    displayPosition: 'left'
  }];
};

var radioName = 'test';

var FormExample = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: null
      }
    };
  },

  onFormDataChange: function(value, event) {
    var formData = _.clone(this.state.formData);
    formData.prop = value;

    this.setState({
      formData: formData
    });
  },

  render: function() {
    return (
      <RadioInput name={radioName} options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

var FormExampleWithDefaultValue = React.createClass({
  getInitialState: function() {
    return {
      formData: {
        prop: 'two'
      }
    };
  },

  onFormDataChange: function(value, event) {
    var formData = _.clone(this.state.formData);
    formData.prop = value;

    this.setState({
      formData: formData
    });
  },

  render: function() {
    return (
      <RadioInput name={radioName} options={getOptions()} value={this.state.formData.prop} onChange={this.onFormDataChange} />
    );
  }
});

describe('radio input component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    testHelper.unmountComponent(this.component);
    this.component = null;
  });

  it('should render', function() {
    this.component = React.render(<RadioInput name={radioName} options={getOptions()} />, div);
    var mainComponent = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');
    var radioGroup = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__radio-group');
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var inputContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__input-container');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');
    var checkedRadio = this.component.getDOMNode().querySelectorAll('option:checked');

    expect(mainComponent.length).to.equal(1);
    expect(inputContainer.length).to.equal(1);
    expect(radioGroup.length).to.equal(1);
    expect(label.length).to.equal(2);
    expect(input.length).to.equal(2);
    expect(label[0].props.children[1]).to.equal('Option 1');
    expect(input[0].props.value).to.equal(1);
    expect(input[0].props.type).to.equal('radio');
    expect(input[0].props.className).to.equal('form-element__input m-radio m-right');
    expect(label[1].props.children[1]).to.equal('Option 2');
    expect(input[1].props.value).to.equal('two');
    expect(input[1].props.type).to.equal('radio');
    expect(input[1].props.type).to.equal('radio');
    expect(input[1].props.className).to.equal('form-element__input m-radio m-right');
    expect(checkedRadio.length).to.equal(0);
  });

  it('should be able to render content to the left of the input', function() {
    this.component = React.render(<RadioInput name={radioName} options={getOptionsLeft()} />, div);
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');

    expect(label[0].props.children[0]).to.equal('Option 1');
    expect(input[0].props.className).to.equal('form-element__input m-radio m-left');
    expect(label[1].props.children[0]).to.equal('Option 2');
    expect(input[1].props.className).to.equal('form-element__input m-radio m-left');
  });

  it('should be able to set default value', function() {
    this.component = React.render(<FormExampleWithDefaultValue />, div);
    var checkedRadio = this.component.getDOMNode().querySelectorAll('input:checked');

    expect(checkedRadio.length).to.equal(1);
    expect(checkedRadio[0].value).to.equal('two');
  });

  it('should be able to render label', function() {
    this.component = React.render(<RadioInput name={radioName} options={getOptions()} label="Label" className="m-safe" />, div);
    var label = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'label');

    expect(label.length).to.equal(3)
    expect(label[0].props.children).to.equal('Label');
  });

  it('should be able to add custom classes', function() {
    this.component = React.render(<RadioInput name={radioName} options={getOptions()} className="m-safe" />, div);
    var mainComponent = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(mainComponent.props.className).to.equal('form-element m-safe');
  });

  it('should be able to attach onChange event', function() {
    this.component = React.render(<FormExample />, div);
    var input = reactTestUtils.scryRenderedDOMComponentsWithTag(this.component, 'input');

    reactTestUtils.Simulate.change(input[1], {
      target: {
        value: 'two'
      }
    });

    expect(this.component.state.formData.prop).to.equal('two');
  });
});
