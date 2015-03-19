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
var ExtendText = require('../../../../assets/components/extend-text.component.jsx');
var testHelper = require('../../../test-helper');
var Fiber = require('fibers');
var _ = require('lodash');
var bluebird = require('bluebird');
var testGlobals = {};
var div;

var customEmptyIndicator = (
  <span className="custom-empty">What?</span>
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

var getDataNoFilter = function() {
  var defer = bluebird.defer();
  defer.resolve(testAutoCompleteItems);
  return defer.promise;
}

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
    var defaultValue = this.props.defaultValue || null;

    return (
      <ExtendText onChange={this.onExtendTextChange} defaultValue={defaultValue} getData={getData} />
    );
  }
});

describe('extend text component', function() {
  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function(done) {
    Fiber(function() {
      //since the auto complete position is in a timeout, we need to use fiber to prevent false failures
      testHelper.sleep(5);

      testHelper.unmountComponent(testGlobals.component);
      testGlobals.component = null;

      done();
    }).run();
  });

  describe('basic functionality', function() {
    it('should update state internal display value', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal({
          display: 'test 1',
          value: 1
        });
        done();
      }).run();
    });

    it('should be able to set initial value', function() {
      testGlobals.component = React.render(<PageTest defaultValue="initial" />, div);
      var extendTextComponent = TestUtils.findRenderedComponentWithType(testGlobals.component, ExtendText);
      var input = TestUtils.findRenderedDOMComponentWithClass(extendTextComponent, 'extend-text__display-input');

      expect(input.getDOMNode().value).to.equal('initial');
      expect(testGlobals.component.state.extendTextValue).to.equal('initial');
      expect(extendTextComponent.state.value).to.equal('initial');
    });

    it('should be able to pass onChange property', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<PageTest />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.extendTextValue).to.deep.equal({
          display: 'test 1',
          value: 1
        });
        done();
      }).run();
    });

    it('should add css class when activating', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var renderedComponent = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text');
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(renderedComponent._owner.state.isActive).to.be.true;
        expect(renderedComponent.props.className).to.equal('extend-text is-active');
        done();
      }).run();
    });

    it('should add loading class if loading is active', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var renderedComponent = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text');

      testGlobals.component.setState({
        isActive: true,
        isLoading: true
      });

      expect(renderedComponent._owner.state.isActive).to.be.true;
      expect(renderedComponent.props.className).to.equal('extend-text is-active m-display-no-results');
    });

    it('should be able to update value with single value', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      testGlobals.component.updateValue('test');

      expect(testGlobals.component.state.value).to.deep.equal({
        display: 'test',
        value: 'test'
      });
    });

    it('should be able to update value with object', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        testGlobals.component.updateValue({
          id: 123,
          display: 'test display',
          value: 'test value'
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal({
          id: 123,
          display: 'test display',
          value: 'test value'
        });
        done();
      }).run();
    });
  });

  describe('events', function() {
    it('should be set to inactive when bluring input', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);
        TestUtils.Simulate.blur(input);

        expect(testGlobals.component.state.isActive).to.be.false;
        done();
      }).run();
    });

    it('should unfocus all auto complete items when bluring input', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 1
        });

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
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
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 1
          });

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.UP
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
          done();
        }).run();
      })

      it('should increase focused item when pressing the down arrow', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 1
          });

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.DOWN
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
          done();
        }).run();
      });

      it('should select the focused item when pressing the enter key', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 3',
            value: 3
          });
          expect(input.getDOMNode().value).to.equal('test 3');
          done();
        }).run();
      });

      it('should select the item when pressing the enter key is value complete matches the item', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          expect(input.getDOMNode().value).to.equal('test 2');
          done();
        }).run();
      });

      it('should set to active on keypress for any key without special functionality (like enter, up arrow, etc...)', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.SHIFT
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.true;
          done();
        }).run();
      });

      it('should select focused item when bluring input', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 1
          });
          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          expect(testGlobals.component.state.isActive).to.be.false;
          done();
        }).run();
      });

      it('should show items on focus', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-container');

          expect(testGlobals.component.state.isActive).to.be.true;
          expect(autoCompleteContainer.props.className).to.equal('extend-text__auto-complete-container');
          done();
        }).run();
      });

      it('should de-focus all items and blur input when pressing escape', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.change(input, {
            target: {
              value: 'f'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ESCAPE
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.be.null;
          expect(input.getDOMNode().value).to.equal('');
          done();
        }).run();
      });

      it('should blur auto complete and clear input when pressing escape when having no items available', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 3'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ESCAPE
          });

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.be.null;
          expect(input.getDOMNode().value).to.equal('');
          done();
        }).run();
      });

      it('should clear value when bluring input if value is not from one of the items', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'f'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.be.null;
          done();
        }).run();
      });

      it('should select item when bluring input if value matches only one item but was not specifically selected', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);

          testHelper.sleep(5);

          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          expect(testGlobals.component.state.isActive).to.be.false;
          expect(testGlobals.component.state.value).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          done();
        }).run();
      });
    });

    describe('new indicator', function() {
      it('should show if allow free form is active and value does not match an auto complete item', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'f'
            }
          });
          TestUtils.Simulate.blur(input);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(1);
          done();
        }).run();
      });

      it('should not show if allow free form is not active', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'f'
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
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active and you select an auto complete item', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active and you select an auto complete item and blur the input', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testGlobals.component.setState({
            focusedAutoCompleteItem: 2
          });

          TestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });
          TestUtils.Simulate.blur(input);

          testHelper.sleep(5);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active value is empty while focused on input', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });

      it('should not show if allow free form is active value is empty', function(done) {
        Fiber(function() {
          testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

          TestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          TestUtils.Simulate.change(input, {
            target: {
              value: ''
            }
          });
          TestUtils.Simulate.blur(input);

          var newIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__new-indicator');

          expect(newIndicator.length).to.equal(0);
          done();
        }).run();
      });
    });

    it('should not update the value if the input does not match an auto complete value and allow free form is not enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.be.null;
        expect(input.getDOMNode().value).to.equal('');
        done();
      }).run();
    });

    it('should not update the value if the input does not match an auto complete value and allow free form is not enabled with pressing enter', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.be.null;
        expect(input.getDOMNode().value).to.equal('');
        done();
      }).run();
    });

    it('should update the value if the input does not match an auto complete value and allow free form is enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.deep.equal({
          display: 'tes',
          value: 'tes'
        });
        expect(input.getDOMNode().value).to.equal('tes');
        done();
      }).run();
    });

    it('should be able to preload data', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} preloadData={true} />, div);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.autoCompleteItems).to.deep.equal(testAutoCompleteItems);
        done();
      }).run();
    });

    it('should show empty indicator when not items are found', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataEmpty} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        var loadingIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__empty-indicator');

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(loadingIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should trigger loading indicator if it is enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        expect(testGlobals.component.state.isLoading).to.be.true;

        var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__loading-indicator');

        expect(emptyIndicator.length).to.equal(1);

        //TODO: investigate: even though the delay is set to 20, this needs to be a bit higer otherwise it will randomly fail
        testHelper.sleep(50);

        expect(testGlobals.component.state.isLoading).to.be.false;
        done();
      }).run();
    });

    it('should not trigger loading indicator if it is not enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} loadingIndicatorEnabled={false} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        expect(testGlobals.component.state.isLoading).to.be.false;

        var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__loading-indicator');

        expect(emptyIndicator.length).to.equal(0);
        done();
      }).run();
    });

    it('should set items based on pass getData property', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

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
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 1
        });

        testHelper.sleep(5);

        var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

        expect(autoCompleteItems[0].props.className).to.equal('');
        expect(autoCompleteItems[1].props.className).to.equal('is-focused');
        expect(autoCompleteItems[2].props.className).to.equal('');
        done();
      }).run();
    });

    it('should focus first item when increasing and none is already focused', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: null
        });

        testGlobals.component.increaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
        done();
      }).run();
    });

    it('should focus next item when increasing and already focused on one', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 0
        });

        testHelper.sleep(5);

        testGlobals.component.increaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(1);
        done();
      }).run();
    });

    it('should focus first item when increasing and already focused on the last', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 2
        });

        testGlobals.component.increaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(0);
        done();
      }).run();
    });

    it('should focus last item when decreasing and none is already focused', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: null
        });

        testHelper.sleep(5);

        testGlobals.component.decreaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should focus previous item when decreasing and already focused on one', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);
        testGlobals.component.setState({
          focusedAutoCompleteItem: 2
        });

        testGlobals.component.decreaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(1);
        done();
      }).run();
    });

    it('should focus last item when decreasing and already focused on the first', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 0
        });

        testHelper.sleep(5);

        testGlobals.component.decreaseFocusedAutoCompleteItem();

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should be able to set value in component that is using extend text', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<PageTest />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var extendTextComponent = TestUtils.findRenderedComponentWithType(testGlobals.component, ExtendText);
        extendTextComponent.setState({
          focusedAutoCompleteItem: 2
        });
        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.extendTextValue).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        done();
      }).run();
    });

    it('should show empty indicator when no items are found', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataEmpty} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__empty-indicator');

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(emptyIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should be able to define custom empty indicator', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} emptyIndicator={customEmptyIndicator} getData={getDataEmpty} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var emptyIndicator = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'custom-empty');

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(emptyIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should be able to match on simple value', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(testGlobals.component.isAutoCompleteDisplayValue('test 2')).to.be.true;
        done();
      }).run();
    });

    it('should be able to match with full object', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');
        TestUtils.Simulate.focus(input);

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

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

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

    it('should be able to set custom debounce wait for data pulling', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} debounce={15} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(3);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(8);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(8);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.isLoading).to.be.false;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(0);

        testHelper.sleep(15);

        expect(testGlobals.component.state.isActive).to.be.true;
        expect(testGlobals.component.state.isLoading).to.be.false;
        expect(testGlobals.component.state.autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    it('should not clear value if the value match an auto complete when blurring input', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getDataNoFilter} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testGlobals.component.setState({
          focusedAutoCompleteItem: 2
        });
        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.blur(input);

        testHelper.sleep(5);

        expect(testGlobals.component.state.isActive).to.be.false;
        expect(testGlobals.component.state.value).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        done();
      }).run();
    });

    it('should be able to get auto complete index from display value', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} preloadData={true} />, div);

        testHelper.sleep(5);

        expect(testGlobals.component.getAutoCompleteIndex('test 3')).to.equal(2);
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

    it('should set value when clicking item', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = TestUtils.scryRenderedDOMComponentsWithTag(autoCompleteContainer, 'li');

        TestUtils.Simulate.click(autoCompleteItems[1]);

        expect(testGlobals.component.state.focusedAutoCompleteItem).to.be.null;
        expect(testGlobals.component.state.value).to.deep.equal(testAutoCompleteItems[1]);
        done();
      }).run();
    });
  });

  describe('tagging', function() {
    it('should store value as an array', function() {
      testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} />, div);

      expect(testGlobals.component.state.value).to.deep.equal([]);
    });

    it('should not add value if it is not in auto complete list and free form is not enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal([]);
        done();
      }).run();
    });

    it('should add value if it is not in auto complete list and free form is enabled', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal([{
          display: 'tes',
          value: 'tes'
        }]);
        done();
      }).run();
    });

    it('should be able to add multiple values', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal([{
          display: 'test 1',
          value: 1
        }, {
          display: 'tes',
          value: 'tes'
        }]);
        done();
      }).run();
    });

    it('should delete tag when clicking the tag remove elements', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        var tagRemoveElements = TestUtils.scryRenderedDOMComponentsWithClass(testGlobals.component, 'extend-text__tag-remove');

        TestUtils.Simulate.click(tagRemoveElements[0]);

        expect(testGlobals.component.state.value).to.deep.equal([{
          display: 'tes',
          value: 'tes'
        }]);

        var tagRemoveElement = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__tag-remove');

        TestUtils.Simulate.click(tagRemoveElement);
        //TODO: investigate: not sure why this give me an error but the above works fine
        // TestUtils.Simulate.click(tagRemoveElements[1]);

        expect(testGlobals.component.state.value).to.deep.equal([]);
        done();
      }).run();
    });

    it('should delete the latest tag when clicking pressing the backspace', function(done) {
      Fiber(function() {
        testGlobals.component = React.render(<ExtendText onChange={testHelper.noop} getData={getData} taggingEnabled={true} allowFreeForm={true} />, div);
        var input = TestUtils.findRenderedDOMComponentWithClass(testGlobals.component, 'extend-text__display-input');

        TestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        TestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.BACKSPACE
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal([{
          display: 'test 1',
          value: 1
        }]);

        TestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.BACKSPACE
        });

        testHelper.sleep(5);

        expect(testGlobals.component.state.value).to.deep.equal([]);
        done();
      }).run();
    });
  });
});
