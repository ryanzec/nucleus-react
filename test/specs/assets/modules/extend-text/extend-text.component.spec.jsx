/*
 * NOTE: The following visual based functionality can not be testing with JSDom:
 *
 * - making sure the textarea version can auto increase the height when typing
 * - make sure the auto complete element is positioned properly to line up with the input
 *
 * @todo: some test are commented out becuase of : https://github.com/facebook/react/issues/1297 : code in : https://github.com/spicyj/react/commit/2c0dcfc58ca00ea44786a4436a17144930c48b30 : does fix the issue
 */
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var reactTestUtils = React.addons.TestUtils;
var ExtendText = require('../../../../../assets/modules/extend-text/extend-text.component.jsx');
var testHelper = require('../../../../test-helper');
var Fiber = require('fibers');
var _ = require('lodash');
var bluebird = require('bluebird');
var testGlobals = {};
var div;

var customEmptyIndicator = (
  <span className="custom-empty">What?</span>
);

var customLoadingIndicator = (
  <span className="custom-loading">What??</span>
);

var testAutoCompleteItems = [{
  display: 'test 1',
  value: 1
}, {
  display: 'test 2',
  value: 2
}, {
  display: 'test 3',
  value: 3
}];

var getData = function(value) {
  var defer = bluebird.defer();
  var data = testAutoCompleteItems;

  if(value) {
    if(value.display === 'test 3' || value === 'test 3') {
      data = [];
    } else if(value.display === 'test 2' || value === 'test 2') {
      data = [testAutoCompleteItems[1]];
    }
  }

  defer.resolve(data);

  return defer.promise;
};

var getDataEmpty = function() {
  var defer = bluebird.defer();

  defer.resolve([]);

  return defer.promise;
};

var getDataDelay = function() {
  var defer = bluebird.defer();

  setTimeout(function() {
    defer.resolve(testAutoCompleteItems);
  }, 20);

  return defer.promise;
};

var PageTest = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: null
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    var initialValue = this.props.initialValue || null;

    return (
      <ExtendText onChange={this.onExtendTextChange} initialValue={initialValue} getData={getData} />
    );
  }
});

describe('extend text component', function() {
  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('basic functionality', function() {
    it('should update state internal display value', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

      TestUtils.Simulate.change(input, {
        target: {
          value: 'f'
        }
      });

      expect(testGlobals.component.state.value).to.equal('f');
    });

    it('should be able to set initial value', function() {
      testGlobals.component = React.render(<PageTest initialValue="initial" />, div);
      var extendTextComponent = TestUtils.findRenderedComponentWithType(testGlobals.component, ExtendText);
      var input = TestUtils.findRenderedDOMComponentWithClass(extendTextComponent, 'extend-text__display-input');

      expect(input.getDOMNode().value).to.equal('initial');
      expect(testGlobals.component.state.extendTextValue).to.equal('initial');
      expect(extendTextComponent.state.value).to.equal('initial');
    });

    it('should be able to pass onChange property', function() {
      testGlobals.component = React.render(<PageTest />, div);
      var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

      TestUtils.Simulate.change(input, {
        target: {
          value: 'f'
        }
      });

      expect(testGlobals.component.state.extendTextValue).to.equal('f');
    });

    it('should add css class when activating', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var renderedComponent = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text');

      testGlobals.component.setState({
        isActive: true
      });

      expect(renderedComponent.props.className).to.equal('extend-text is-active');
    });

    it('should not have active class if loading is active', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var renderedComponent = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text');

      testGlobals.component.setState({
        isActive: true,
        isLoading: true
      });

      expect(renderedComponent.props.className).to.equal('extend-text');
    });

    it('should be able to update value with single value', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.updateValue('test');

      expect(testGlobals.component.state.value).to.equal('test');
    });

    it('should be able to update value with object', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.updateValue({
        id: 123,
        display: 'test display',
        value: 'test value'
      });

      expect(testGlobals.component.state.value).to.deep.equal({
        id: 123,
        display: 'test display',
        value: 'test value'
      });
    });
  });

  describe('events', function() {
    it('should be set to inactive when bluring input', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

      TestUtils.Simulate.focus(input);
      TestUtils.Simulate.blur(input);

      expect(testGlobals.component.state.isActive).to.be.false;
    });

    it('should unfocus all auto complete items when bluring input', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 1
        });
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.blur(input);

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.be.null;
        done();
      }).run();
    });
  });

  describe('auto complete', function() {
    describe('events', function() {
      it('should decrease focused item when pressing the up arrow', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 1,
            isActive: true
          });
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.UP
          });

          expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
          done();
        }).run();
      })

      it('should increase focused item when pressing the down arrow', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 1,
            isActive: true
          });
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.DOWN
          });

          expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
          done();
        }).run();
      });

      it('should select the focused item when pressing the enter key', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2,
            isActive: true
          });
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 3',
            value: 3
          });
          expect(input.getDOMNode().value).to.equal('test 3');
          done();
        }).run();
      });

      it('should set to active on keypress for any key without special functionality (like enter, up arrow, etc...)', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.SHIFT
          });

          expect(testGlobals.component.state.isActive).to.be.true;
          done();
        }).run();
      });

      it('should select focused item when bluring input', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);
          testGlobals.component.setState({
            focusedAutoCompleteItem: 1
          });
          TestUtils.Simulate.blur(input);

          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          done();
        }).run();
      });

      it('should show items on focus', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 2'
          }
        });
        TestUtils.Simulate.blur(input);
        TestUtils.Simulate.focus(input);

        var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-container');

        expect(autoCompleteContainer.props.className).to.equal('extend-text__auto-complete-container');
      });

      it('should de-focus all items and blur input when pressing escape', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        testGlobals.component.setState({
          focusedAutoCompleteItem: 2,
          isActive: true
        });

        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'f'
          }
        });
        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ESCAPE
        });

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.equal('');
        expect(input.getDOMNode().value).to.equal('');
      });

      it('should blur auto complete and clear input when pressing escape when having no items available', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        testGlobals.component.setState({
          focusedAutoCompleteItem: 2,
          isActive: true
        });

        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 3'
          }
        });
        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ESCAPE
        });

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.equal('');
        expect(input.getDOMNode().value).to.equal('');
      });

      it('should clear value when bluring input if value is not from one of the items', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: 'f'
          }
        });
        TestUtils.Simulate.blur(input);

        expect(testGlobals.component.state.value).to.equal('');
      });

      it('should select item when bluring input if value matches only one item but was not specifically selected', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);
          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.blur(input);

          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          done();
        }).run();
      });
    });

    describe('new indicator', function() {
      it('should show if allow free form is active and value does not match an auto complete item', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: 'f'
          }
        });
        TestUtils.Simulate.blur(input);

        var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

        expect(newIndicator.length).to.equal(1);
      });

      it('should not show if allow free form is not active', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: 'f'
          }
        });
        TestUtils.Simulate.blur(input);

        var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

        expect(newIndicator.length).to.equal(0);
      });

      it('should not show if allow free form is active but value matches an auto complete item', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);
          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          TestUtils.Simulate.blur(input);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active but value matches an auto complete item', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);
          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          TestUtils.Simulate.blur(input);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active and you select an auto complete item', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
        testGlobals.component.setState({
          focusedAutoCompleteItem: 2,
          isActive: true
        });
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

        expect(newIndicator.length).to.equal(0);
      });

      it('should not show if allow free form is active and you select an auto complete item and blur the input', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2,
            isActive: true
          });
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });
          TestUtils.Simulate.blur(input);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active value is empty', function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 2'
          }
        });
        TestUtils.Simulate.blur(input);
        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.change(input, {
          target: {
            value: ''
          }
        });
        TestUtils.Simulate.blur(input);

        var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

        expect(newIndicator.length).to.equal(0);
      });
    });

    it('should show loading indicator when not items are found', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.setState({
        isActive: true,
        isLoading: true
      });

      var loadingIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__loading-indicator');

      expect(loadingIndicator.length).to.equal(1);
    });

    it('should be able to define a custom loading indicator', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} loadingIndicator={customLoadingIndicator} />, div);
      testGlobals.component.setState({
        isActive: true,
        isLoading: true
      });

      var loadingIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'custom-loading');

      expect(loadingIndicator.length).to.equal(1);
    });

    it('should trigger loading indicator if it is enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} loadingIndicator={customLoadingIndicator} />, div);

        testHelper.sleep(15);

        expect(testGlobals.component.state.isLoading).to.be.true;
        expect(testGlobals.component.state.isActive).to.be.true;

        testHelper.sleep(10);

        expect(testGlobals.component.state.isLoading).to.be.false;
        expect(testGlobals.component.state.isActive).to.be.true;
        done();
      }).run();
    });

    it('should not trigger loading indicator if it is not enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} loadingIndicator={customLoadingIndicator} loadingIndicatorEnabled={false} />, div);

        testHelper.sleep(15);

        expect(testGlobals.component.state.isLoading).to.be.false;
        expect(testGlobals.component.state.isActive).to.be.false;

        testHelper.sleep(10);

        expect(testGlobals.component.state.isLoading).to.be.false;
        expect(testGlobals.component.state.isActive).to.be.true;
        done();
      }).run();
    });

    it('should set items based on pass getData property', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          isActive: true
        });
        var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

        //make sure elements are correct
        autoCompleteItems.forEach(function(item, key) {
          expect(item.props['data-key']).to.equal(key);
          expect(item.props.children).to.equal(testAutoCompleteItems[key].display);
        });

        //make sure there is the correct number of elements
        expect(autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    it('should add is focused class when focused item is set', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 1,
          isActive: true
        });

        var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

        expect(autoCompleteItems[0].props.className).to.equal('');
        expect(autoCompleteItems[1].props.className).to.equal('is-focused');
        expect(autoCompleteItems[2].props.className).to.equal('');
        done();
      }).run();
    });

    it('should focus first item when increasing and none is already focused', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.setState({
        focusedAutoCompleteItem: null
      });

      testGlobals.component.increaseFocusedAutoCompleteItem();

      expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
    });

    it('should focus next item when increasing and already focused on one', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 0
        });

        testGlobals.component.increaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(1);
        done();
      }).run();
    });

    it('should focus first item when increasing and already focused on the last', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.setState({
        focusedAutoCompleteItem: 2
      });

      testGlobals.component.increaseFocusedAutoCompleteItem();

      expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
    });

    it('should focus last item when decreasing and none is already focused', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: null
        });

        testGlobals.component.decreaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should focus previous item when decreasing and already focused on one', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.setState({
        focusedAutoCompleteItem: 2
      });

      testGlobals.component.decreaseFocusedAutoCompleteItem();

      expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(1);
    });

    it('should focus last item when decreasing and already focused on the first', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 0
        });

        testGlobals.component.decreaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should be able to set value in component that is using extend text', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<PageTest />, div);

        testHelper.sleep(5);

        var extendTextComponent = TestUtils.findRenderedComponentWithType(testGlobals.component, ExtendText);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        extendTextComponent.setState({
          focusedAutoCompleteItem: 2
        });
        TestUtils.Simulate.blur(input);

        expect(testGlobals.component.state.extendTextValue).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        done();
      }).run();
    });

    it('should show empty indicator when not items are found', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataEmpty} />, div);
      var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__empty-indicator');

      expect(emptyIndicator.length).to.equal(1);
    });

    it('should be able to define custom empty indicator', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} emptyIndicator={customEmptyIndicator} getData={getDataEmpty} />, div);
      var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'custom-empty');

      expect(emptyIndicator.length).to.equal(1);
    });

    it('should be able to match on simple value', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        expect(testGlobals.component.isAutoCompleteDisplayValue('test 2')).to.be.true;
        done();
      }).run();
    });

    it('should be able to match with full object', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        testHelper.sleep(5);

        expect(testGlobals.component.isAutoCompleteDisplayValue({
          display: 'test 2',
          value: 2
        })).to.be.true;
        done();
      }).run();
    });

    it('should not activate/pull data until character threshold is meet', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        var autoCompleteContainerElement = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-container');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'te'
          }
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(0);
        expect(autoCompleteContainerElement.props.className).to.equal('extend-text__auto-complete-container u-hide');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(3);
        expect(autoCompleteContainerElement.props.className).to.equal('extend-text__auto-complete-container');
        done();
      }).run();
    });

    it('should not activate until character threshold is meet', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(3);

        TestUtils.Simulate.blur(input);

        expect(testGlobals.component.state.isActive).to.be.false;

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    it('should be able to set custom debounce wait for data pulling', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} debounce={20} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(15);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(0);

        testHelper.sleep(10);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    // it('should set focused item when mousing over one', function(done) {
    //   Fiber(function() {
    //     testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

    //     testHelper.sleep(5);

    //     var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-options');
    //     var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

    //     TestUtils.Simulate.mouseEnter(autoCompleteItems[2]);

    //     expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
    //     done();
    //   }).run();
    // });

    // it.only('should set value when clicking item', function(done) {
    //   Fiber(function() {
    //     testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

    //     testHelper.sleep(5);

    //     var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-options');
    //     var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

    //     TestUtils.Simulate.mouseEnter(autoCompleteItems[1]);
    //     TestUtils.Simulate.mouseDown(autoCompleteItems[1]);

    //     expect(testGlobals.component.state.focusedAutoCompleteItem).to.be.null;
    //     expect(testGlobals.component.state.value).to.deep.equal(testAutoCompleteItems[1]);
    //     done();
    //   }).run();
    // });
  });
});
