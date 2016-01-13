var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var _ = require('lodash');

var selectInput = {};

selectInput.displayName = 'SelectInput';

selectInput.mixins = [
  ReactPureRenderMixin
];

selectInput.propTypes = {
  className: React.PropTypes.string,
  emptyOption: React.PropTypes.any,
  options: React.PropTypes.array
};

selectInput.getDefaultProps = function selectInputGetDefaultProps() {
  return {
    className: null,
    emptyOption: 'Select',
    options: []
  };
};

selectInput.getCssClasses = function selectInputGetCssClasses() {
  var cssClasses = ['form-element__field-container'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

selectInput.getInputPassThroughProps = function selectInputGetInputPassThroughProps() {
  var props = _.clone(this.props);

  delete props.className;
  delete props.label;
  delete props.emptyOption;
  delete props.options;

  props.value = this.cleanValue(props.value);

  return props;
};

selectInput.cleanValue = function selectInputCleanValue(value) {
  return (value || value === false) ? value : '';
};

selectInput.renderInput = function selectInputRenderInput() {
  var selectOptions = _.map(this.props.options, function selectInputRenderInputOptionsMap(option) {
    return (
      <option
        value={option.value}
        key={option.value}
      >
        {option.display}
      </option>
    );
  });

  if (this.props.emptyOption !== false) {
    selectOptions.unshift(
      <option
        value=""
        key="empty"
      >
        {this.props.emptyOption}
      </option>
    );
  }

  return (
    <select
      className="form-element__input m-select"
      {...this.getInputPassThroughProps()}
    >
      {selectOptions}
    </select>
  );
};

selectInput.render = function selectInputRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderInput()}
    </div>
  );
};

module.exports = React.createClass(selectInput);
