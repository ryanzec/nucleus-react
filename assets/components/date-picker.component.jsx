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
  calendarHeaderText: React.PropTypes.string
};

datePicker.getDefaultProps = function datePickerGetDefaultProps() {
  return {
    format: 'MM/DD/YYYY',
    selectedDay: null,
    onClickDate: null,
    placeholder: window.i18n['components/date-picker'].placeholder(),
    calendarHeaderText: window.i18n['components/date-picker'].calendarHeaderText()
  };
};

datePicker.getInitialState = function datePickerGetInitialState() {
  return {
    isCalendarActive: false
  };
};

datePicker.singlePanelClose = function datePickerClose() {
  this.setState({
    isCalendarActive: false
  });
};

datePicker.getCalendarPassThroughProps = function datePickerGetCalendarPassThoughProps() {
  var props = _.clone(this.props);

  delete props.children;
  delete props.placeholder;
  delete props.calendarHeaderText;

  props.headerText = this.props.calendarHeaderText;

  return props;
};

datePicker.onFocusInput = function datePickerOnFocusInput() {
  this.setState({
    isCalendarActive: !this.state.isCalendarActive
  });
};

datePicker.onClickCalendar = function datePickerOnClickCalendar(event) {
  //need to manually track whether or not to close component on click since we can't use stopPropagation on native events
  this.dontCloseOnClick = true;
};

datePicker.renderCalendar = function datePickerRenderCalendar() {
  var calendar = null;

  if (this.state.isCalendarActive === true) {
    calendar = (
      <span>
        <Calendar
          showControls={true}
          {...this.getCalendarPassThroughProps()} />
      </span>
    );
  }

  return calendar;
};

datePicker.render = function datePickerRender() {
  return (
    <div className="date-picker" onClick={this.onClickCalendar}>
      <TextboxInput
        className="date-picker__input"
        placeholder={this.props.placeholder}
        value={this.props.selectedDay}
        readOnly={true}
        append={
          <SvgIcon
            svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
            fragment="calendar" />
        }
        onFocus={this.onFocusInput} />
      {this.renderCalendar()}
    </div>
  );
};

module.exports = React.createClass(datePicker);
