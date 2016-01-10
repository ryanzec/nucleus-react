var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var debounceMixin = require('../../../../assets/mixins/debounce.mixin');
var testHelper = require('../../../test-helper');
var _ = require('lodash');
var Fiber = require('fibers');

var TestComponent = React.createClass({
  mixins: [
    debounceMixin
  ],

  testValue: 0,

  debounceMethods: [{
    name: 'increase',
    func: function() {
      this.testValue += 1;
    },
    delay: 20
  }, {
    name: 'decrease',
    func: function() {
      this.testValue -= 1;
    },
    delay: 30
  }],

  render: function() {
    return (
      <div>Test Component</div>
    );
  }
});

describe('debounce mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    //make sure to clean up the render component since it does add content to the jsdom document
    testHelper.unmountComponent(this.component);

    //verify everything was cleaned up properly
    expect(document.body.querySelectorAll('*').length).to.equal(0);
  });

  it('should add methods to component', function() {
    this.component = ReactDOM.render(<TestComponent />, div);

    expect(_.isFunction(this.component.increase)).to.be.true;
    expect(_.isFunction(this.component.decrease)).to.be.true;
  });

  it('should debounce the added methods', function(done) {
    Fiber(function() {
      this.component = ReactDOM.render(<TestComponent />, div);

      expect(this.component.testValue).to.equal(0);

      this.component.increase();
      this.component.increase();
      this.component.increase();
      this.component.increase();

      testHelper.sleep(15);

      expect(this.component.testValue).to.equal(0);

      testHelper.sleep(10);

      expect(this.component.testValue).to.equal(1);

      this.component.decrease();
      this.component.decrease();
      this.component.decrease();
      this.component.decrease();

      testHelper.sleep(25);

      expect(this.component.testValue).to.equal(1);

      testHelper.sleep(10);

      expect(this.component.testValue).to.equal(0);
      done();
    }).run();
  });
});
