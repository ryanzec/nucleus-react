var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Callout = require('../../../../assets/components/callout.component.jsx');
var testHelper = require('../../../test-helper');

describe('callout component', function() {
    var div;

    beforeEach(function() {
        div = document.createElement('div');
    });

    it('should render', function() {
        this.component = ReactDOM.render(<Callout headerText="Header Text">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.childNodes[0].className).to.equal('callout__header');
        expect(callout.childNodes[0].textContent).to.equal('Header Text');
        expect(callout.childNodes[1].className).to.equal('callout__content');
        expect(callout.childNodes[1].textContent).to.equal('callout');
    });

    it('should be able to add custom classes', function() {
        this.component = ReactDOM.render(<Callout className="m-safe">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.className).to.equal('callout m-safe');
    });

    it('should not render header element if header text is not prevent', function() {
        this.component = ReactDOM.render(<Callout className="m-safe">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.childNodes[0].className).to.equal('callout__content');
    });
});
