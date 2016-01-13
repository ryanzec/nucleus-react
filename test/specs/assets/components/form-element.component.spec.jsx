var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var FormElement = require('../../../../assets/components/form-element.component.jsx');
var testHelper = require('../../../test-helper');

describe('form element component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<FormElement></FormElement>, div);
    var formElement = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element');

    expect(formElement.length).to.equal(1);
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<FormElement className="m-safe"></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.contain('m-safe');
  });

  it('should add invalid class using invalid setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'invalid'} isValid={false}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.contain('invalid');
  });

  it('should add invalid class using both setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'both'} isValid={false}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.contain('invalid');
  });

  it('should add valid class using valid setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'valid'} isValid={true}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.contain('valid');
  });

  it('should add valid class using both setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'both'} isValid={true}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.contain('valid');
  });

  it('should not add valid class using invalid setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'invalid'} isValid={true}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.not.contain('valid');
  });

  it('should not add valid class using false setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={false} isValid={true}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.not.contain('valid');
  });

  it('should not add invalid class using valid setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={'valid'} isValid={false}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.not.contain('invalid');
  });

  it('should not add invalid class using false setting', function() {
    this.component = ReactDOM.render(<FormElement renderValidation={false} isValid={false}></FormElement>, div);
    var formElement = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element');

    expect(formElement.className).to.not.contain('invalid');
  });
});
