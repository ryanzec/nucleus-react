var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var _ = require('lodash');
var SvgIcon = require('./svg-icon.component.jsx');

var radioInput = {};

radioInput.displayName = 'RadioInput';

radioInput.mixins = [
  ReactPureRenderMixin
];

radioInput.propTypes = {
  className: React.PropTypes.string,
  options: React.PropTypes.array.isRequired
};

radioInput.getDefaultProps = function radioInputGetDefaultProps() {
  return {
    className: null,
    options: []
  };
};

radioInput.getInputPassThroughProps = function() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.options;
  delete props.value;

  return props;
};

radioInput.getCssClasses = function radioInputGetCssClasses() {
  var cssClasses = ['form-element__field-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

radioInput.renderInput = function radioInputRenderInput() {
  var options = _.map(this.props.options, function radioInputRenderInputOptionsMap(option) {
    var checked = this.props.value === option.value;
    var icon = null;
    var iconProperties = {
      fragment: 'radio-empty',
      outerClassName: 'm-right'
    };

    if (checked === true) {
      iconProperties.fragment = 'radio-checked';
    }

    if (option.displayPosition === 'left') {
      iconProperties.outerClassName = 'm-left';
      icon = React.createElement(SvgIcon, iconProperties);

      return (
        <label
          className="m-toggle"
          key={option.value}
        >
          {option.display}{icon}<input
            className="form-element__input m-radio m-left"
            type="radio"
            checked={checked}
            value={option.value}
            {...this.getInputPassThroughProps()}
          />
        </label>
      );
    }

    icon = React.createElement(SvgIcon, iconProperties);

    return (
      <label
        className="m-toggle"
        key={option.value}
      >
        {icon}<input
          className="form-element__input m-radio m-right"
          type="radio"
          value={option.value}
          checked={checked}
          {...this.getInputPassThroughProps()}
        />
        {option.display}
      </label>
    );
  }.bind(this));

  return (
    <div className="form-element__radio-group">
      {options}
    </div>
  );
};

radioInput.render = function radioInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInput()}
    </div>
  );
};

module.exports = React.createClass(radioInput);
