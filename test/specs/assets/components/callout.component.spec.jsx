var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var Callout = require('../../../../assets/components/callout.component.jsx');
var testHelper = require('../../../test-helper');

describe.only('callout component', function() {
    var div;

    beforeEach(function() {
        div = document.createElement('div');
    });

    it('should render', function() {
        this.component = React.render(<Callout headerText="Header Text">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.props.children[0].props.className).to.equal('callout__header');
        expect(callout.props.children[0].props.children).to.equal('Header Text');
        expect(callout.props.children[1].props.className).to.equal('callout__content');
        expect(callout.props.children[1].props.children).to.equal('callout');
    });

    it('should be able to add custom classes', function() {
        this.component = React.render(<Callout className="m-safe">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.props.className).to.equal('callout m-safe');
    });

    it('should not render header element if header text is not prevent', function() {
        this.component = React.render(<Callout className="m-safe">callout</Callout>, div);
        var callout = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'callout');

        expect(callout.props.children[0]).to.be.null;
    });
});
