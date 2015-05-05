var React = require('react/addons');
var TextboxInput = require('./textbox-input.component.jsx');
var Calendar = require('./calendar.component.jsx');
var SvgIcon = require('./svg-icon.component.jsx');
var singlePanelMixin = require('../mixins/single-panel.mixin');
var _ = require('lodash');

var datePicker = {};

datePicker.displayName = 'DatePicker';

datePicker.mixins = [
  React.addons.PureRenderMixin,
  singlePanelMixin
];

datePicker.propTypes = {
  format: React.PropTypes.string,
  selectedDay: React.PropTypes.string,
  onClickDate: React.PropTypes.func,
  placeholder: React.PropTypes.string,
  calendarHeaderText: React.PropTypes.string,
  renderValidation: React.PropTypes.oneOf([false, 'both', 'valid', 'invalid']),
  validateOnLoad: React.PropTypes.bool,
  validators: React.PropTypes.array,
  closeOnClick: React.PropTypes.bool
};

datePicker.getDefaultProps = function datePickerGetDefaultProps() {
  return {
    format: 'MM/DD/YYYY',
    selectedDay: null,
    onClickDate: null,
    placeholder: window.i18n['components/date-picker'].placeholder(),
    calendarHeaderText: window.i18n['components/date-picker'].calendarHeaderText(),
    renderValidation: false,
    validateOnLoad: false,
    validators: [],
    closeOnClick: false
  };
};

datePicker.getInitialState = function datePickerGetInitialState() {
  return {
    isCalendarActive: false
  };
};

datePicker.componentDidMount = function datePickerComponentDidMount() {
  this.validator = this.refs.input.validator;
};

datePicker.cleanValue = function datePickerCleanValue(value) {
  return this.refs.input.cleanValue(value);
};

datePicker.singlePanelClose = function datePickerClose() {
  this.refs.input.refs.input.getDOMNode().blur();
  this.setState({
    isCalendarActive: false
  });
};

datePicker.getCalendarPassThroughProps = function datePickerGetCalendarPassThoughProps() {
  var props = _.clone(this.props);

  delete props.children;
  delete props.placeholder;
  delete props.calendarHeaderText;

  if (props.onClickDate) {
    delete props.onClickDate;

    props.onClickDate = this.onClickDate;
  }

  props.headerText = this.props.calendarHeaderText;

  return props;
};

datePicker.onFocusInput = function datePickerOnFocusInput() {
  this.setState({
    isCalendarActive: true
  });
};

datePicker.onClickCalendar = function datePickerOnClickCalendar(event) {
  this.dontCloseOnClick = true;
};

datePicker.onClickDate = function datePickerOnClickDate(value) {
  if (this.validator) {
    this.validator.validate(this.cleanValue(value));
  }

  /* istanbul ignore else */
  if (this.props.onClickDate) {
    this.props.onClickDate(value);
  }

  if (this.props.closeOnClick === true) {
    this.setState({
      isCalendarActive: false
    });
  }
};

datePicker.renderCalendar = function datePickerRenderCalendar() {
  var calendar = null;

  if (this.state.isCalendarActive === true) {
    calendar = (
      <span>
        <Calendar
          showControls={true}
          {...this.getCalendarPassThroughProps()}
        />
      </span>
    );
  }

  return calendar;
};

datePicker.render = function datePickerRender() {
  return (
    <div
      className="date-picker"
      onClick={this.onClickCalendar}
    >
      <TextboxInput
        ref="input"
        className="date-picker__input"
        placeholder={this.props.placeholder}
        value={this.props.selectedDay}
        readOnly={true}
        append={
          <SvgIcon fragment="calendar" />
        }
        renderValidation={this.props.renderValidation}
        validateOnLoad={this.props.validateOnLoad}
        validators={this.props.validators}
        onFocus={this.onFocusInput}
      />
      {this.renderCalendar()}
    </div>
  );
};

module.exports = React.createClass(datePicker);
