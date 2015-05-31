/*
 * NOTE: The following visual based functionality can not be testing with JSDom:
 *
 * - tooltip content positioning relative to tooltip handle
 */
var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var tooltipMixin = require('../../../../assets/mixins/tooltip.mixin.jsx');
var testHelper = require('../../../test-helper');
var Fiber = require('fibers');

var SimpleTooltip = React.createClass({
  mixins: [
    tooltipMixin
  ],

  getTooltipContent: function(className) {
    return (
      <div className={className}>Simple tooltip content</div>
    );
  },

  render: function(className) {
    return (
      <div className={className}>
        <div className="tooltip__handle">Handle</div>
      </div>
    );
  }
});

var TooltipWithSticky = React.createClass({
  mixins: [
    tooltipMixin
  ],

  getTooltipContent: function() {
    return (
      <div className="tooltip__content">tooltip with sticky content</div>
    );
  },

  getTooltipStickyContent: function() {
    return (
      <div className="tooltip__content">tooltip sticky content</div>
    );
  },

  render: function() {
    return (
      <div className="tooltip">
        <div className="tooltip__handle">Handle</div>
      </div>
    );
  }
});

var testGlobals = {};

describe('tooltip mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    //make sure to clean up the render component since it does add content to the jsdom document
    testHelper.unmountComponent(testGlobals.component);

    //verify everything was cleaned up properly
    expect(document.body.querySelectorAll('*').length).to.equal(0);
  });

  describe('core behavior', function() {
    it('should default regular and sticky tooltip to inactive', function() {
      testGlobals.component = React.render(<SimpleTooltip />, div);

      expect(testGlobals.component.state.tooltipActive).to.be.false;
      expect(testGlobals.component.state.tooltipStickyActive).to.be.false;
    });

    it('should append tooltip content to the body', function() {
      testGlobals.component = React.render(<SimpleTooltip />, div);

      expect(document.body.querySelectorAll('body > div > .tooltip__content').length).to.equal(1);
    });

    it('should unregister the component with the single panel store when uncomunting the component', function() {
      testGlobals.component = React.render(<SimpleTooltip />, div);
      testHelper.unmountComponent(testGlobals.component);

      expect(testGlobals.component.dontCloseOnClick).to.be.true;
    });

    it('should remove the appended content when unmounting the component', function() {
      testGlobals.component = React.render(<SimpleTooltip />, div);
      testHelper.unmountComponent(testGlobals.component);

      expect(document.body.querySelectorAll('body > div > .tooltip__content').length).to.equal(0);
    });

    it('should be able to display a tooltip in a fixed position', function() {
      testGlobals.component = React.render(<SimpleTooltip tooltipFixed={true} />, div);

      expect(document.body.querySelectorAll('body > div > .tooltip__content.m-fixed').length).to.equal(1);
    });

    it('should be able to define a custom spacing between the tooltip handle and content', function() {
      testGlobals.component = React.render(<SimpleTooltip tooltipSpacing={10} />, div);

      expect(testGlobals.component.props.tooltipSpacing).to.equal(10);
    });
  });

  describe('regular content', function() {
    it('should show when mouse enters handle', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        expect(document.body.querySelectorAll('body > div > .tooltip__content.is-active').length).to.equal(1);
        done();
      }).run();
    });

    it('should hide when the mouse leaves handle', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(10);

        expect(testGlobals.component.state.tooltipActive).to.be.false;
        done();
      }).run();
    });

    it('should be able to delay the display', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip tooltipShowDelay={50} />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(30);

        expect(testGlobals.component.state.tooltipActive).to.be.false;

        testHelper.sleep(30);

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        done();
      }).run();
    });

    it('should be able to deplay the hiding', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip tooltipHideDelay={50} />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(30);

        expect(testGlobals.component.state.tooltipActive).to.be.true;

        testHelper.sleep(30);

        expect(testGlobals.component.state.tooltipActive).to.be.false;
        done();
      }).run();
    });

    it('should keep element visible when mouse leaves handle and mouse enter tooltip content element', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip tooltipHideDelay={50} />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(30);

        expect(testGlobals.component.state.tooltipActive).to.be.true;

        document.body.querySelector('body > div > .tooltip__content').dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(60);

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        done();
      }).run();
    });

    it('should hide when the mouse leaves the tooltip content element', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip tooltipShowDelay={50} />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(60);

        expect(testGlobals.component.state.tooltipActive).to.be.false;
        done();
      }).run();
    });

    it('should not hide when clicking on the tooltip content element', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<SimpleTooltip tooltipHideDelay={50} />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(10);

        document.body.querySelector('body > div > .tooltip__content').dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        document.body.querySelector('body > div > .tooltip__content').dispatchEvent(testHelper.createNativeClickEvent({
          action: 'click'
        }));

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        done();
      }).run();
    });
  });

  describe('sticky content', function() {
    it('should display when the handle is clicked', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeClickEvent({
          eventType: 'HTMLEvents',
          action: 'click'
        }));

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.true;
        done();
      }).run();
    });

    it('should hide when the handle is clicked and tooltip content is already showing', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeClickEvent({
          eventType: 'HTMLEvents',
          action: 'click'
        }));

        handle.getDOMNode().dispatchEvent(testHelper.createNativeClickEvent({
          eventType: 'HTMLEvents',
          action: 'click'
        }));

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.false;
        done();
      }).run();
    });

    it('should not hide when mouse leaves the handle', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeClickEvent({
          eventType: 'HTMLEvents',
          action: 'click'
        }));

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(10);

        expect(testGlobals.component.state.tooltipActive).to.be.false;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.true;
        done();
      }).run();
    });

    it('should not hide when clicking sticky tooltip content', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        handle.getDOMNode().dispatchEvent(testHelper.createNativeClickEvent({
          eventType: 'HTMLEvents',
          action: 'click'
        }));

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseleave'
        }));

        testHelper.sleep(10);

        document.body.querySelector('body > div > .tooltip__content').dispatchEvent(testHelper.createNativeClickEvent());

        testHelper.sleep(10);

        expect(testGlobals.component.state.tooltipActive).to.be.false;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.true;
        done();
      }).run();
    });

    it('should hide when pressing the escape key', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        reactTestUtils.Simulate.click(handle);

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.false;
        done();
      }).run();
    });

    it('should hide sticky and regular content element when clicking the document', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<TooltipWithSticky />, div);
        var handle = React.addons.TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'tooltip__handle');

        handle.getDOMNode().dispatchEvent(testHelper.createNativeMouseEvent({
          action: 'mouseenter'
        }));

        testHelper.sleep(10);

        reactTestUtils.Simulate.click(handle);

        expect(testGlobals.component.state.tooltipActive).to.be.true;
        expect(testGlobals.component.state.tooltipStickyActive).to.be.false;
        done();
      }).run();
    });
  });
});
