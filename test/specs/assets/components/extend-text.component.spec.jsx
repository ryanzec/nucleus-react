/*
 * NOTE: The following visual based functionality can not be testing with JSDom:
 *
 * - making sure the textarea version can auto increase the height when typing
 * - make sure the auto complete element is positioned properly to line up with the input
 *
 * @todo: some test are commented out becuase of : https://github.com/facebook/react/issues/1297 : code in : https://github.com/spicyj/react/commit/2c0dcfc58ca00ea44786a4436a17144930c48b30 : does fix the issue
 */
var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var ExtendText = require('../../../../assets/components/extend-text.component.jsx');
var formMixin = require('../../../../assets/mixins/form.mixin');
var testHelper = require('../../../test-helper');
var Fiber = require('fibers');
var _ = require('lodash');
var bluebird = require('bluebird');
var testData = {};
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

var staticData = [{
  display: 'static 1',
  value: 's1'
}, {
  display: 'static 2',
  value: 's2'
}, {
  display: 'static 3',
  value: 's3'
}, {
  display: 'unique display',
  value: 'ud'
}, {
  display: 'uv',
  value: 'unique value'
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

var getDataRejected = function(value) {
  var defer = bluebird.defer();

  defer.reject('SERVER ERROR');

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

var getDataBigDelay = function() {
  var defer = bluebird.defer();

  setTimeout(function() {
    defer.resolve(testAutoCompleteItems);
  }, 200);

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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText onChange={this.onExtendTextChange} value={value} getData={getData} />
    );
  }
});

var PageTestStaticData = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText onChange={this.onExtendTextChange} value={value} staticData={staticData} />
    );
  }
});

var PageTestStaticDataTaggingEnabledAllowFreeForm = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText placeholder="Test" onChange={this.onExtendTextChange} value={value} taggingEnabled={true} allowFreeForm={true} staticData={staticData} />
    );
  }
});

var PageTestTagging = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText onChange={this.onExtendTextChange} value={value} getData={getData} taggingEnabled={true} />
    );
  }
});

var PageTestTaggingValidation = React.createClass({
    mixins: [
        formMixin
    ],

    getInitialState: function() {
        return {
            form: {
                extendTextValue: []
            },
            initialForm: {
                extendTextValue: []
            }
        };
    },

    componentWillMount: function() {
        this.formInputs = {
            form: {
                extendTextValue: {
                    component: ExtendText,
                    props: {
                        getData: getData,
                        taggingEnabled: true,
                        //characterThreshold: 1,
                        //debounce: 300,
                        renderValidation: 'invalid',
                        validators: [{
                            validator: function(value) {
                                return false;
                            }
                        }]
                    }
                }
            }
        };
    },

    render: function() {
        return this.getInputs('form').extendTextValue.render();
    }
});

var PageTestTaggingAllowFreeForm = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} />
    );
  }
});

var PageTestTaggingAllowFreeFormCommaTagging = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getData}
        taggingEnabled={true}
        allowFreeForm={true}
        addTagKeyCodes={[testHelper.keyCodes.COMMA]}
      />
    );
  }
});

var PageTestAllowFreeFormNoFilter = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getDataNoFilter}
        allowFreeForm={true}
      />
    );
  }
});

var PageTestTaggingAllowFreeFormThresholdDebouce = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getData}
        taggingEnabled={true}
        allowFreeForm={true}
        characterThreshold={1}
        debounce={500}
      />
    );
  }
});

var PageTestTaggingAllowFreeFormThresholdDebouceDataDeley = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={this.state.extendTextValue}
        getData={getDataBigDelay}
        taggingEnabled={true}
        allowFreeForm={true}
        characterThreshold={1}
        debounce={500}
      />
    );
  }
});

var PageTestTaggingAllowFreeFormThreshold1 = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} characterThreshold={1} />
    );
  }
});

var PageTestTaggingAllowFreeFormThreshold2 = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} characterThreshold={2} />
    );
  }
});

var PageTestTaggingAllowFreeFormNoFilter = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getDataNoFilter} taggingEnabled={true} allowFreeForm={true} />
    );
  }
});

var PageTestTaggingAllowFreeFormAllowDuplicates = React.createClass({
  getInitialState: function() {
    return {
      extendTextValue: []
    };
  },

  onExtendTextChange: function(value) {
    this.setState({
      extendTextValue: value
    });
  },

  render: function() {
    return (
      <ExtendText onChange={this.onExtendTextChange} value={this.state.extendTextValue} getData={getData} taggingEnabled={true} allowFreeForm={true} allowDuplicates={true} />
    );
  }
});

var PageTestNoFilter = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText onChange={this.onExtendTextChange} value={value} getData={getDataNoFilter} />
    );
  }
});

var PageTestAllowFreeForm = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText onChange={this.onExtendTextChange} value={value} getData={getData} allowFreeForm={true} />
    );
  }
});

var FormExampleValidationTrueBoth = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="both"
        validators={
          [{
            validator: function(value) {
              return true;
            }
          }]
        }
      />
    );
  }
});

var FormExampleValidationFalseBothOnLoad = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="both"
        validateOnLoad={true}
        validators={
          [{
            validator: function(value) {
              return false;
            },
            message: 'test validation message'
          }]
        }
      />
    );
  }
});

var FormExampleValidationFalseBothOnLoadNoValidationMessages = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="both"
        renderValidationMessages={false}
        validateOnLoad={true}
        validators={
          [{
            validator: function(value) {
              return false;
            },
            message: 'test validation message'
          }]
        }
      />
    );
  }
});

var FormExampleValidationTrueInvalid = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="invalid"
        validators={
          [{
            validator: function(value) {
              return true;
            }
          }]
        }
      />
    );
  }
});

var FormExampleValidationFalseBoth = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="both"
        validators={
          [{
            validator: function(value) {
              return false;
            }
          }]
        }
      />
    );
  }
});

var FormExampleValidationFalseValid = React.createClass({
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
    var value = this.props.value || this.state.extendTextValue;

    return (
      <ExtendText
        onChange={this.onExtendTextChange}
        value={value}
        getData={getData}
        renderValidation="valid"
        validators={
          [{
            validator: function(value) {
              return false;
            }
          }]
        }
      />
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

      testHelper.unmountComponent(testData.component);
      testData.component = null;

      done();
    }).run();
  });

  describe('basic functionality', function() {
    it('should update value', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'test 1',
          value: 1
        });
        done();
      }).run();
    });

    it('should be able to add custom css class', function() {
        testData.component = ReactDOM.render(<ExtendText className="m-safe" onChange={testHelper.noop} getData={getData} />, div);
        var renderedComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');

        expect(renderedComponent.className).to.contain('m-safe');
    });

    it('should be able to set initial value', function() {
      var initialValue = {display: 'initial', value: 'initial'};
      testData.component = ReactDOM.render(<PageTest value={initialValue} />, div);
      var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(extendTextComponent, 'extend-text__display-input');

      expect(ReactDOM.findDOMNode(input).value).to.equal('initial');
      expect(testData.component.state.extendTextValue).to.deep.equal(initialValue);
    });

    it('should be able to pass onChange property', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'test 1',
          value: 1
        });
        done();
      }).run();
    });

    it('should add css class when activating', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var renderedComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(testData.component.state.isActive).to.be.true;
        expect(renderedComponent.className).to.equal('extend-text is-active');
        done();
      }).run();
    });

    it('should add loading class if loading is active', function() {
      testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
      var renderedComponent = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');

      testData.component.setState({
        isActive: true,
        isLoading: true
      });

      expect(testData.component.state.isActive).to.be.true;
      expect(renderedComponent.className).to.equal('extend-text is-active m-display-no-results');
    });

    it('should be able to update value with single value', function() {
      testData.component = ReactDOM.render(<PageTest />, div);
      var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

      extendTextComponent.valueHasChanged = true;
      extendTextComponent.updateValue('test');

      expect(testData.component.state.extendTextValue).to.deep.equal({
        display: 'test',
        value: 'test'
      });
    });

    it('should be able to update value with object', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

        extendTextComponent.valueHasChanged = true;
        extendTextComponent.updateValue({
          id: 123,
          display: 'test display',
          value: 'test value'
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          id: 123,
          display: 'test display',
          value: 'test value'
        });
        done();
      }).run();
    });

    it('should not show drop down indicator indicator if it is not enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} />, div);
        var indicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__drop-down-indicator');

        expect(indicator.length).to.equal(0);
        done();
      }).run();
    });

    it('should show drop down indicator indicator if it is enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText dropDownIconFragment="chevron-down" onChange={testHelper.noop} getData={getDataDelay} />, div);
        var indicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__drop-down-indicator');

        expect(indicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should show label', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText label="Extend Text" dropDownIconFragment="chevron-down" onChange={testHelper.noop} getData={getDataDelay} />, div);
        var label = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__label');

        expect(label.length).to.equal(1);
        expect(label[0].textContent).to.equal('Extend Text');
        done();
      }).run();
    });

    it('should not try to load data when getData is not passed', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(testData.component.state.isLoading).to.be.false;
        done();
      }).run();
    });
  });

  describe('events', function() {
    it('should be set to inactive when bluring input', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);
        extendTextComponent.singlePanelClose();

        expect(testData.component.state.isActive).to.be.false;
        done();
      }).run();
    });

    it('should unfocus all auto complete items when bluring input', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: 1
        });

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(testData.component.state.isActive).to.be.false;
        expect(testData.component.state.focusedAutoCompleteItem).to.be.null;
        done();
      }).run();
    });
  });

  describe('auto complete', function() {
    describe('events', function() {
      it('should decrease focused item when pressing the up arrow', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testData.component.setState({
            focusedAutoCompleteItem: 1
          });

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.UP
          });

          testHelper.sleep(5);

          expect(testData.component.state.focusedAutoCompleteItem).to.equal(0);
          done();
        }).run();
      });

      it('should increase focused item when pressing the down arrow', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          testData.component.setState({
            focusedAutoCompleteItem: 1
          });

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.DOWN
          });

          testHelper.sleep(5);

          expect(testData.component.state.focusedAutoCompleteItem).to.equal(2);
          done();
        }).run();
      });

      it('should select the focused item when pressing the enter key', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          extendTextComponent.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 3',
            value: 3
          });
          expect(ReactDOM.findDOMNode(input).value).to.equal('test 3');
          done();
        }).run();
      });

      it('should select the item when pressing the enter key is value completely matches the item', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          expect(ReactDOM.findDOMNode(input).value).to.equal('test 2');
          done();
        }).run();
      });

      it('should set to active on keypress for any key without special functionality (like enter, up arrow, etc...)', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');
          testData.component.setState({
            focusedAutoCompleteItem: 2
          });

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.SHIFT
          });

          testHelper.sleep(5);

          expect(testData.component.state.isActive).to.be.true;
          done();
        }).run();
      });

      it('should not select focused item when bluring input if free form not allowed', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          extendTextComponent.setState({
            focusedAutoCompleteItem: 1
          });
          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(testData.component.state.extendTextValue).to.be.null;
          expect(extendTextComponent.state.focusedAutoCompleteItem).to.be.null;
          expect(extendTextComponent.state.isActive).to.be.false;
          done();
        }).run();
      });

      it('should show items on focus', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');

          expect(testData.component.state.isActive).to.be.true;
          expect(autoCompleteContainer.className).to.equal('extend-text__auto-complete-container');
          done();
        }).run();
      });

      it('should select item on mouse click', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(15);

          var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
          var autoCompleteItems = Array.prototype.slice.call(
            ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
          );

          reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          expect(ReactDOM.findDOMNode(input).value).to.equal('test 2');
          done();
        }).run();
      });

      it('should de-focus all items and blur input when pressing escape', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          extendTextComponent.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'f'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ESCAPE
          });

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.be.null;
          expect(ReactDOM.findDOMNode(input).value).to.equal('');
          done();
        }).run();
      });

      it('should blur auto complete and clear input when pressing escape when having no items available', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          extendTextComponent.setState({
            focusedAutoCompleteItem: 2
          });

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 3'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ESCAPE
          });

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.be.null;
          expect(ReactDOM.findDOMNode(input).value).to.equal('');
          done();
        }).run();
      });

      it('should clear value when bluring input if value is not from one of the items', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'f'
            }
          });

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.be.null;
          done();
        }).run();
      });

      it('should not clear value when bluring input value has not changed since last focus', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.TAB
          });

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          expect(ReactDOM.findDOMNode(input).value).to.equal('test 2');
          done();
        }).run();
      });

      it('should select item when pressing enter input if value matches only one item but was not specifically selected', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          done();
        }).run();
      });

      it('should select item when blurring input if value exactly matches an auto complete item', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTest />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test 2'
            }
          });

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal({
            display: 'test 2',
            value: 2
          });
          done();
        }).run();
      });
    });

    it('should not update the value if the input does not match an auto complete value and allow free form is not enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendTextComponent.state.isActive).to.be.false;
        expect(testData.component.state.extendTextValue).to.be.null;
        expect(ReactDOM.findDOMNode(input).value).to.equal('');
        done();
      }).run();
    });

    it('should not update the value if the input does not match an auto complete value and allow free form is not enabled with pressing enter', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.be.null;
        expect(ReactDOM.findDOMNode(input).value).to.equal('');
        done();
      }).run();
    });

    it('should update the value if the input does not match an auto complete value and allow free form is enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestAllowFreeForm />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'tes',
          value: 'tes',
          isNew: true
        });
        expect(ReactDOM.findDOMNode(input).value).to.equal('tes');
        done();
      }).run();
    });

    it('should be able to preload data', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} preloadData={true} />, div);

        testHelper.sleep(5);

        expect(testData.component.state.isActive).to.be.false;
        expect(testData.component.state.autoCompleteItems).to.deep.equal(testAutoCompleteItems);
        done();
      }).run();
    });

    it('should show empty indicator when not items are found', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataEmpty} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        var loadingIndicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__empty-indicator');

        expect(testData.component.state.isActive).to.be.true;
        expect(loadingIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should trigger loading indicator if it is enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        expect(testData.component.state.isLoading).to.be.true;

        var emptyIndicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__loading-indicator');

        expect(emptyIndicator.length).to.equal(1);

        //TODO: investigate: even though the delay is set to 20, this needs to be a bit higer otherwise it will randomly fail
        testHelper.sleep(50);

        expect(testData.component.state.isLoading).to.be.false;
        done();
      }).run();
    });

    it('should not trigger loading indicator if it is not enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataDelay} loadingIndicatorEnabled={false} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(15);

        expect(testData.component.state.isLoading).to.be.false;

        var emptyIndicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__loading-indicator');

        expect(emptyIndicator.length).to.equal(0);
        done();
      }).run();
    });

    it('should set items based on pass getData property', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        //make sure elements are correct
        autoCompleteItems.forEach(function(item, key) {
          expect(parseInt(item.getAttribute('data-key'))).to.equal(key);
          expect(item.textContent).to.equal(testAutoCompleteItems[key].display);
        });

        //make sure there is the correct number of elements
        expect(autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    it('should add new indicator to top', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        //make sure elements are correct
        testAutoCompleteItems.forEach(function(item, key) {
          expect(parseInt(autoCompleteItems[key].getAttribute('data-key'))).to.equal(key);
          expect(autoCompleteItems[key].textContent).to.equal(item.display);
        });

        expect(parseInt(autoCompleteItems[3].getAttribute('data-key'))).to.equal(3);
        expect(autoCompleteItems[3].childNodes[0].childNodes[0].textContent).to.equal('tes');
        expect(autoCompleteItems[3].childNodes[0].childNodes[1].textContent).to.equal(' (New)');

        //make sure there is the correct number of elements
        expect(autoCompleteItems.length).to.equal(4);
        done();
      }).run();
    });

    it('should add new indicator when allow free form is set to true', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} allowFreeForm={true} newPosition="top" />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        //make sure elements are correct
        testAutoCompleteItems.forEach(function(item, key) {
          expect(parseInt(autoCompleteItems[key + 1].getAttribute('data-key'))).to.equal(key + 1);
          expect(autoCompleteItems[key + 1].textContent).to.equal(item.display);
        });

        expect(parseInt(autoCompleteItems[0].getAttribute('data-key'))).to.equal(0);
        expect(autoCompleteItems[0].childNodes[0].childNodes[0].textContent).to.equal('tes');
        expect(autoCompleteItems[0].childNodes[0].childNodes[1].textContent).to.equal(' (New)');

        //make sure there is the correct number of elements
        expect(autoCompleteItems.length).to.equal(4);
        done();
      }).run();
    });

    it('should work like no data was returned if getData is rejected', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataRejected} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        expect(testData.component.state.isActive).to.be.true;
        expect(testData.component.state.isLoading).to.be.false;
        expect(autoCompleteItems.length).to.equal(0);
        done();
      }).run();
    });

    it('should add is focused class when focused item is set', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: 1
        });

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        expect(autoCompleteItems[0].className).to.equal('');
        expect(autoCompleteItems[1].className).to.equal('is-focused');
        expect(autoCompleteItems[2].className).to.equal('');
        done();
      }).run();
    });

    it('should focus first item when increasing and none is already focused', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: null
        });

        testData.component.increaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(0);
        done();
      }).run();
    });

    it('should focus next item when increasing and already focused on one', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: 0
        });

        testHelper.sleep(5);

        testData.component.increaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(1);
        done();
      }).run();
    });

    it('should focus first item when increasing and already focused on the last', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: 2
        });

        testData.component.increaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(0);
        done();
      }).run();
    });

    it('should focus last item when decreasing and none is already focused', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: null
        });

        testHelper.sleep(5);

        testData.component.decreaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should focus previous item when decreasing and already focused on one', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);
        testData.component.setState({
          focusedAutoCompleteItem: 2
        });

        testData.component.decreaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(1);
        done();
      }).run();
    });

    it('should focus last item when decreasing and already focused on the first', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        testData.component.setState({
          focusedAutoCompleteItem: 0
        });

        testHelper.sleep(5);

        testData.component.decreaseFocusedAutoCompleteItem();

        expect(testData.component.state.focusedAutoCompleteItem).to.equal(2);
        done();
      }).run();
    });

    it('should be able to set value in component that is using extend text', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        extendTextComponent.setState({
          focusedAutoCompleteItem: 2
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        done();
      }).run();
    });

    it('should show empty indicator when no items are found', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getDataEmpty} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var emptyIndicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__empty-indicator');

        expect(testData.component.state.isActive).to.be.true;
        expect(emptyIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should be able to define custom empty indicator', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} emptyIndicatorNode={customEmptyIndicator} getData={getDataEmpty} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        var emptyIndicator = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'custom-empty');

        expect(testData.component.state.isActive).to.be.true;
        expect(emptyIndicator.length).to.equal(1);
        done();
      }).run();
    });

    it('should not activate/pull data until character threshold is meet', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} characterThreshold={3} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');
        var autoCompleteContainerElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'te'
          }
        });

        testHelper.sleep(5);

        expect(testData.component.state.isActive).to.be.false;
        expect(testData.component.state.autoCompleteItems.length).to.equal(0);
        expect(autoCompleteContainerElement.className).to.equal('extend-text__auto-complete-container u-hide');

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        expect(testData.component.state.isActive).to.be.true;
        expect(testData.component.state.autoCompleteItems.length).to.equal(3);
        expect(autoCompleteContainerElement.className).to.equal('extend-text__auto-complete-container');
        done();
      }).run();
    });

    it('should be able to set custom debounce wait for data pulling', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} debounce={50} />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(3);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(8);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(8);

        expect(testData.component.state.isActive).to.be.false;
        expect(testData.component.state.isLoading).to.be.false;
        expect(testData.component.state.autoCompleteItems.length).to.equal(0);

        testHelper.sleep(55);

        expect(testData.component.state.isActive).to.be.true;
        expect(testData.component.state.isLoading).to.be.false;
        expect(testData.component.state.autoCompleteItems.length).to.equal(3);
        done();
      }).run();
    });

    it('should not clear value if the value matches an auto complete when blrring input', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestNoFilter />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        extendTextComponent.setState({
          focusedAutoCompleteItem: 2
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendTextComponent.state.isActive).to.be.false;
        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        done();
      }).run();
    });

    it('should be able to get auto complete index from display value', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} preloadData={true} />, div);

        testHelper.sleep(5);

        expect(testData.component.getAutoCompleteIndex('test 3')).to.equal(2);
        done();
      }).run();
    });

    it('should not change value when tabbing after selecting a value', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTest />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.DOWN
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.DOWN
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.DOWN
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });
        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.TAB
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal({
          display: 'test 3',
          value: 3
        });
        expect(extendTextComponent.props.value.display).to.equal('test 3');
        done();
      }).run();
    });

    it('should not remove new value if typing during the retrieval of remote data that is delayed', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormThresholdDebouceDataDeley />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(600);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test'
          }
        });

        testHelper.sleep(750);

        expect(extendTextComponent.state.autoCompleteItems).to.deep.equal([{
          display: 'test 1',
          value: 1
        }, {
          display: 'test 2',
          value: 2
        }, {
          display: 'test 3',
          value: 3
        }, {
          display: 'test',
          value: 'test',
          isNew: true
        }]);
        done();
      }).run();
    });

    it('should not have new item after click on an exist one and then focus input again', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestAllowFreeFormNoFilter />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[0]);

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(extendTextComponent.state.autoCompleteItems).to.deep.equal([{
          display: 'test 1',
          value: 1
        }, {
          display: 'test 2',
          value: 2
        }, {
          display: 'test 3',
          value: 3
        }]);
        done();
      }).run();
    });

    // it.only('should set focused item when mousing over one', function(done) {
    //   Fiber(function() {
    //     testData.component = ReactDOM.render(<ExtendText onChange={testHelper.noop} getData={getData} />, div);
    //     var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

    //     reactTestUtils.Simulate.focus(input);

    //     testHelper.sleep(5);

    //     var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
    //     var autoCompleteItems = Array.prototype.slice.call(
    //       ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
    //     );

    //     //TestUtils.Simulate.mouseEnter(autoCompleteItems[2]);

    //     reactTestUtils.Simulate.mouseDown(ReactDOM.findDOMNode(autoCompleteItems[2]));
    //     reactTestUtils.Simulate.mouseOver(ReactDOM.findDOMNode(autoCompleteItems[2]));

    //     expect(testData.component.state.focusedAutoCompleteItem).to.equal(2);
    //     done();
    //   }).run();
    // });
  });

  describe('tagging', function() {
    describe('events', function() {
      it('should deactivate the auto complete when when selecting with mouse click', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
          var autoCompleteItems = Array.prototype.slice.call(
            ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
          );

          reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          done();
        }).run();
      });

      it('should select item when blurring input if value exactly matches an auto complete item', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);

          testHelper.sleep(5);

          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'test'
            }
          });

          testHelper.sleep(5);

          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          expect(extendTextComponent.state.isActive).to.be.false;
          expect(testData.component.state.extendTextValue).to.deep.equal([{
            display: 'test',
            value: 'test',
            isNew: true
          }]);
          done();
        }).run();
      });
    });

    it('should be able to set initial value with multiple tags', function() {
      var tags = [{
        display: 'test1',
        value: 't1'
      }, {
        display: 'test2',
        value: 't2'
      }];
      testData.component = ReactDOM.render(<PageTestTagging value={tags} />, div);

      expect(testData.component.state.extendTextValue).to.deep.equal(tags);
    });

    it('should be able to set custom class name for tags', function() {
      var tags = [{
        display: 'test1',
        value: 't1',
        className: 'm-safe'
      }, {
        display: 'test2',
        value: 't2',
        className: 'm-danger'
      }];
      testData.component = ReactDOM.render(<PageTestTagging value={tags} />, div);

      var tags = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__tag');

      expect(tags[0].className).to.contain('m-safe');
      expect(tags[1].className).to.contain('m-danger');
    });

    it('should remove tags when bluring input that has invalid value', function(done) {
      Fiber(function() {
        var tags = [{
          display: 'test1',
          value: 't1'
        }, {
          display: 'test2',
          value: 't2'
        }];
        testData.component = ReactDOM.render(<PageTestTagging value={tags} />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal(tags);
        done();
      }).run();
    });

    it('should store value as an array', function() {
      testData.component = ReactDOM.render(<PageTestTagging />, div);

      expect(testData.component.state.extendTextValue).to.deep.equal([]);
    });

    it('should not add value if it is not in auto complete list and free form is not enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTagging />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([]);
        done();
      }).run();
    });

    it('should add value if it is not in auto complete list and free form is enabled', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);
        done();
      }).run();
    });

    it('should be able to configure key codes that will trigger adding the tag', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormCommaTagging />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.COMMA
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);
        expect(ReactDOM.findDOMNode(input).value).to.equal('');
        done();
      }).run();
    });

    it('should not add value if it is in selected tags', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);
        done();
      }).run();
    });

    it('should add value if it is in selected tags if duplicates are allowed', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormAllowDuplicates />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes',
          isNew: true
        }, {
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);
        done();
      }).run();
    });

    it('should display auto complete list automatically after adding in tag when threshold is 0', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        expect(autoCompleteItems.length).to.equal(3);
        expect(autoCompleteItems[0].textContent).to.equal('test 1');
        expect(autoCompleteItems[1].textContent).to.equal('test 2');
        expect(autoCompleteItems[2].textContent).to.equal('test 3');

        done();
      }).run();
    });

    it('should not display auto complete when attempting to add in tag that already exists and threshold is higher than 0', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormThreshold1 />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        expect(extendTextComponent.state.isActive).to.be.false;
        done();
      }).run();
    });

    it('should not filter out already selected values for remote data', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormNoFilter />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        expect(autoCompleteItems.length).to.equal(3);
        expect(autoCompleteItems[0].textContent).to.equal('test 1');
        expect(autoCompleteItems[1].textContent).to.equal('test 2');
        expect(autoCompleteItems[2].textContent).to.equal('test 3');

        done();
      }).run();
    });

    it('should be able to add multiple values', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'test 1',
          value: 1
        }, {
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);
        done();
      }).run();
    });

    it('should delete tag when clicking the tag remove elements', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        var tagRemoveElements = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__tag-remove');

        reactTestUtils.Simulate.mouseUp(tagRemoveElements[0]);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes',
          isNew: true
        }]);

        var tagRemoveElement = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__tag-remove');

        reactTestUtils.Simulate.mouseUp(tagRemoveElement);
        //TODO: investigate: not sure why this give me an error but the above works fine
        // reactTestUtils.Simulate.click(tagRemoveElements[1]);

        expect(testData.component.state.extendTextValue).to.deep.equal([]);
        done();
      }).run();
    });

    it('should not activate input when clicking delete element', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        var tagRemoveElements = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__tag-remove');

        reactTestUtils.Simulate.mouseUp(tagRemoveElements[0]);

        expect(document.activeElement).to.not.equal(ReactDOM.findDOMNode(input));
        expect(extendTextComponent.state.isActive).to.be.false;
        done();
      }).run();
    });

    it('should delete the latest tag when clicking pressing the backspace', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeForm />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'test 1'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(5);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.BACKSPACE
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'test 1',
          value: 1
        }]);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.BACKSPACE
        });

        testHelper.sleep(5);

        expect(testData.component.state.extendTextValue).to.deep.equal([]);
        done();
      }).run();
    });

    it('should should not pull data if value is selected before the get data is triggered by debouce', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormThresholdDebouce />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'tes'
          }
        });

        testHelper.sleep(200);

        reactTestUtils.Simulate.keyDown(input, {
          which: testHelper.keyCodes.ENTER
        });

        testHelper.sleep(1000);

        expect(extendTextComponent.state.isActive).to.be.false;
        expect(extendTextComponent.state.isLoading).to.be.false;
        expect(extendTextComponent.state.autoCompleteItems.length).to.equal(0);
        expect(testData.component.state.extendTextValue).to.deep.equal([{
          display: 'tes',
          value: 'tes'
        }]);
        expect(ReactDOM.findDOMNode(input).value).to.equal('');
        done();
      }).run();
    });

    it('should clear input when blurring input if get data call has not been made', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestTaggingAllowFreeFormThreshold2 />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 't'
          }
        });

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendTextComponent.state.displayInputValue).to.equal('');
        done();
      }).run();
    });
  });

  describe('validation', function() {
    it('should not show validation on initial load by default', function() {
      testData.component = ReactDOM.render(<FormExampleValidationTrueBoth />, div);
      var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');

      expect(extendText.className).to.equal('extend-text m-display-no-results');
    });

    it('should run and be able to show validation on initial load', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationFalseBothOnLoad />, div);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var validationMessages = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__validation-message');

        expect(extendText.className).to.equal('extend-text m-display-no-results m-invalid');
        expect(validationMessages.length).to.equal(1);
        expect(validationMessages[0].textContent).to.equal('test validation message');
        done();
      }).run();
    });

    it('should not show validation messages', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationFalseBothOnLoadNoValidationMessages />, div);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var validationMessages = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'form-element__validation-message');

        expect(extendText.className).to.equal('extend-text m-display-no-results m-invalid');
        expect(validationMessages.length).to.equal(0);
        done();
      }).run();
    });

    it('should show valid validation', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationTrueBoth />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendText.className).to.equal('extend-text m-valid');
        done();
      }).run();
    });

    it('should not show valid validation if configued for invalid only', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationTrueInvalid />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendText.className).to.equal('extend-text');
        done();
      }).run();
    });

    it('should show invalid validation', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationFalseBoth />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendText.className).to.equal('extend-text m-invalid');
        done();
      }).run();
    });

    it('should not show invalid validation if configured for valid only', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<FormExampleValidationFalseValid />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-options');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);

        expect(extendText.className).to.equal('extend-text');
        done();
      }).run();
    });

    it('should not show validation when initializing tagging extend text to an empty array', function(done) {
      Fiber(function() {
        var initialValue = [];
        testData.component = ReactDOM.render(<PageTestTaggingValidation value={initialValue} />, div);
        var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        extendTextComponent.singlePanelClose();

        testHelper.sleep(5);


        var extendText = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text');

        expect(extendText.className).to.equal('extend-text');
        done();
      }).run();
    });
  });

  describe('static data', function() {
    describe('tagging', function() {
      it('should be able to add multiple values', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTestStaticDataTaggingEnabledAllowFreeForm />, div);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'static 1'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'stat'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          testHelper.sleep(5);

          expect(testData.component.state.extendTextValue).to.deep.equal([{
            display: 'static 1',
            value: 's1'
          }, {
            display: 'stat',
            value: 'stat',
            isNew: true
          }]);
          done();
        }).run();
      });

      it('should filter out already selected values', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTestStaticDataTaggingEnabledAllowFreeForm />, div);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          reactTestUtils.Simulate.change(input, {
            target: {
              value: 'static 1'
            }
          });

          testHelper.sleep(5);

          reactTestUtils.Simulate.keyDown(input, {
            which: testHelper.keyCodes.ENTER
          });

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
          var autoCompleteItems = Array.prototype.slice.call(
            ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
          );

          //make sure elements are correct
          autoCompleteItems.forEach(function(item, key) {
            expect(parseInt(item.getAttribute('data-key'))).to.equal(key);
            expect(item.textContent).to.equal(staticData[key + 1].display);
          });

          //make sure there is the correct number of elements
          expect(autoCompleteItems.length).to.equal(staticData.length - 1);
          done();
        }).run();
      });

      it('should not activate input when clicking delete element', function(done) {
        Fiber(function() {
          testData.component = ReactDOM.render(<PageTestStaticDataTaggingEnabledAllowFreeForm />, div);
          var extendTextComponent = reactTestUtils.findRenderedComponentWithType(testData.component, ExtendText);
          var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
          var autoCompleteItems = Array.prototype.slice.call(
            ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
          );

          reactTestUtils.Simulate.mouseDown(autoCompleteItems[0]);
          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          reactTestUtils.Simulate.focus(input);

          testHelper.sleep(5);

          var autoCompleteItems = Array.prototype.slice.call(
            ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
          );
          reactTestUtils.Simulate.mouseDown(autoCompleteItems[0]);
          extendTextComponent.singlePanelClose();

          testHelper.sleep(5);

          var tagRemoveElements = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'extend-text__tag-remove');

          reactTestUtils.Simulate.mouseDown(tagRemoveElements[0]);

          expect(document.activeElement).to.not.equal(ReactDOM.findDOMNode(input));
          expect(extendTextComponent.state.isActive).to.be.false;
          done();
        }).run();
      });

      //TODO: re-implement: not quite sure how to test this with the changes in react 0.14.x
      // it('should not render placeholder if there are tags values', function(done) {
      //   Fiber(function() {
      //     testData.component = ReactDOM.render(<PageTestStaticDataTaggingEnabledAllowFreeForm />, div);
      //     var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

      //     expect(parseInt(input.getAttribute('placeholder'))).to.equal('Test');

      //     reactTestUtils.Simulate.focus(input);

      //     testHelper.sleep(5);

      //     reactTestUtils.Simulate.change(input, {
      //       target: {
      //         value: 'static 1'
      //       }
      //     });

      //     testHelper.sleep(5);

      //     reactTestUtils.Simulate.keyDown(input, {
      //       which: testHelper.keyCodes.ENTER
      //     });

      //     testHelper.sleep(5);

      //     expect(parseInt(input.getAttribute('placeholder'))).to.be.null;
      //     done();
      //   }).run();
      // });
    });

    it('should be able to define data', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestStaticData />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItems = Array.prototype.slice.call(
          ReactDOM.findDOMNode(testData.component).querySelectorAll('.extend-text__auto-complete-container li')
        );

        //make sure elements are correct
        autoCompleteItems.forEach(function(item, key) {
          expect(parseInt(item.getAttribute('data-key'))).to.equal(key);
          expect(item.textContent).to.equal(staticData[key].display);
        });

        //make sure there is the correct number of elements
        expect(autoCompleteItems.length).to.equal(staticData.length);
        done();
      }).run();
    });

    it('should be able to filter by display value', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestStaticData />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'unique display'
          }
        });

        testHelper.sleep(15);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItem = ReactDOM.findDOMNode(testData.component).querySelector('.extend-text__auto-complete-container li');

        expect(autoCompleteItem.textContent).to.equal('unique display');
        done();
      }).run();
    });

    it('should be able to filter by value value', function(done) {
      Fiber(function() {
        testData.component = ReactDOM.render(<PageTestStaticData />, div);
        var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__display-input');

        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
          target: {
            value: 'unique value'
          }
        });

        testHelper.sleep(5);

        var autoCompleteContainer = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'extend-text__auto-complete-container');
        var autoCompleteItem = ReactDOM.findDOMNode(testData.component).querySelector('.extend-text__auto-complete-container li');

        expect(autoCompleteItem.textContent).to.equal('uv');
        done();
      }).run();
    });
  });
});
