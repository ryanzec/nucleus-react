var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var formOnChangeMixin = require('../../../../assets/mixins/form-on-change.mixin');
var testHelper = require('../../../test-helper');
var testGlobals = {};

var Example = React.createClass({
  formData: {
    formData: [
      'prop'
    ]
  },

  mixins: [
    formOnChangeMixin
  ],

  getInitialState: function() {
    return {
      formData: {
        prop: null
      }
    };
  },

  render: function() {
    return (
      <span></span>
    );
  }
});

describe('form on change mixin', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  afterEach(function() {
    //make sure to clean up the render component since it does add content to the jsdom document
    testHelper.unmountComponent(testGlobals.component);
    testGlobals.component = null;
  });

  it('should add method to component', function() {
    testGlobals.component = React.render(<Example />, div);

    expect(testGlobals.component.state.formData.prop).to.be.null;
    expect(testGlobals.component.onFormDataPropChange).to.be.a('function');
  });

  it('should properly update configured data for generated methods', function() {
    testGlobals.component = React.render(<Example />, div);
    testGlobals.component.onFormDataPropChange('test');

    expect(testGlobals.component.state.formData.prop).to.equal('test');
  });
});
