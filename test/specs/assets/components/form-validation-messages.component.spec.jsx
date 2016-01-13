var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var FormValidationMessages = require('../../../../assets/components/form-validation-messages.component.jsx');
var testHelper = require('../../../test-helper');

describe('form validation messages component', function() {
    var div;

    beforeEach(function() {
        div = document.createElement('div');
    });

    it('should render', function() {
        this.component = ReactDOM.render(<FormValidationMessages messages={[{message: 'test validation message'}]} />, div);
        var container = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__validation-messages');
        var messsage = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__validation-message');

        expect(container.className).to.equal('form-element__validation-messages');
        expect(messsage.textContent).to.equal('test validation message');
    });

    it('should render multiple messages', function() {
        this.component = ReactDOM.render(
            <FormValidationMessages
                className="m-safe"
                messages={[{message: 'test validation message'}, {message: 'test validation message2'}]}
            />,
            div
        );
        var messsages = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'form-element__validation-message');

        expect(messsages.length).to.equal(2);
        expect(messsages[0].textContent).to.equal('test validation message');
        expect(messsages[1].textContent).to.equal('test validation message2');
    });

    it('should be able to add custom classes', function() {
        this.component = ReactDOM.render(<FormValidationMessages className="m-safe" messages={[{message: 'test validation message'}]} />, div);
        var container = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__validation-messages');

        expect(container.className).to.contain('m-safe');
    });

    it('should be able to add custom classes to messages', function() {
        this.component = ReactDOM.render(<FormValidationMessages className="m-safe" messages={[{message: 'test validation message', className: 'm-danger'}]} />, div);
        var messsage = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__validation-message');

        expect(messsage.className).to.contain('m-danger');
    });
});
