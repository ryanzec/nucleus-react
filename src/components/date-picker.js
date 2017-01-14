import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import moment from 'moment-timezone';

import Button from './button';
import DatePickerDay from './date-picker-day';
import FormTextbox from './form-textbox';
import SvgIcon from './svg-icon';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    let startedSelectedDate;

    if (props.selectedDays.length > 0 && moment.isMoment(props.selectedDays[0])) {
      startedSelectedDate = props.selectedDays[0];
    }

    this.state = {
      viewDate: null,
      hours: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.hours()) : '00',
      minutes: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.minutes()) : '00',
      seconds: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.seconds()) : '00',
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.selectedDays.length > 0 && moment.isMoment(newProps.selectedDays[0])) {
      this.setState({
        hours: this.convertTimeValueToString(newProps.selectedDays[0].hours()),
        minutes: this.convertTimeValueToString(newProps.selectedDays[0].minutes()),
        seconds: this.convertTimeValueToString(newProps.selectedDays[0].seconds()),
      });
    }
  }

  componentWillMount() {
    let viewDate;

    if (this.props.selectedDays.length > 0 && moment.isMoment(this.props.selectedDays[0])) {
      viewDate = this.props.selectedDays[0];
    } else {
      viewDate = moment();
    }

    this.setState({
      viewDate
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClickNextMonth = () => {
    this.setState({
      viewDate: this.state.viewDate.clone().add(1, 'month')
    });
  }

  onClickPreviousMonth = () => {
    this.setState({
      viewDate: this.state.viewDate.clone().subtract(1, 'month')
    });
  }

  onFocusTime = (event) => {
    const formField = event.target.getAttribute('data-form-field');

    if (parseInt(this.state[formField], 10) === 0) {
      this.setState({
        [formField]: '',
      });
    }
  }

  onBlurTime = (event) => {
    const formField = event.target.getAttribute('data-form-field');
    let newValue = this.convertTimeValueToString(event.target.value);

    this.setState({
      [formField]: newValue,
    }, () => {
      let newDate;

      if (this.props.selectedDays.length > 0 && moment.isMoment(this.props.selectedDays[0])) {
        newDate = this.props.selectedDays[0].clone();
      } else {
        newDate = moment();
      }

      newDate.hours(this.state.hours);
      newDate.minutes(this.state.minutes);
      newDate.seconds(this.state.seconds);

      this.props.onClickDate(newDate);
    });
  }

  onChangeTime = (event) => {
    const formField = event.target.getAttribute('data-form-field');
    let newValue = this.convertTimeValueToString(event.target.value, false);

    if (newValue > 24 && formField === 'hours') {
      newValue = '23';
    } else if (newValue > 60) {
      newValue = '59';
    }

    this.setState({
      [formField]: newValue,
    });
  }

  convertTimeValueToString(value, addLeadingZero = true) {
    let parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (addLeadingZero) {
      return (parsedValue + '').length === 1 ? '0' + parsedValue : '' + parsedValue;
    } else {
      return parsedValue === 0 ? '' : '' + parsedValue;
    }
  }

  getCssClasses() {
    let cssClasses = ['date-picker'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  getCalendarMonthWeeks() {
    const baseMonth = this.state.viewDate.month();
    const currentProcessingDay = this.state.viewDate.clone().startOf('month').weekday(0);
    const calendarMonthWeeks = [];

    do {
      const weekDays = [];

      for (let x = 0; x < 7; x += 1) {
        weekDays.push(currentProcessingDay.clone());

        currentProcessingDay.add(1, 'days');
      }

      calendarMonthWeeks.push(weekDays);
    } while (currentProcessingDay.month() === baseMonth);

    return calendarMonthWeeks;
  }

  isActiveDay(day) {
    let isActive = false;

    if (this.props.selectedDays.length > 0 && moment.isMoment(this.props.selectedDays[0])) {
      this.props.selectedDays.forEach((selectedDay) => {
        if (isActive) {
          return;
        }

        if (day.diff(selectedDay.clone().startOf('day'), 'days') === 0) {
          isActive = true;
        }
      });
    }

    return isActive;
  }

  isDisabledDay(day) {
    let isDisabled = false;

    if (this.props.minDate || this.props.maxDate) {
      isDisabled = (
        (
          this.props.minDate
          && this.props.minDate.isAfter(day)
        )
        || (
          this.props.maxDate
          && this.props.maxDate.isBefore(day)
        )
      );
    }

    return isDisabled;
  }

  renderCalendarMonthWeeks() {
    const viewMonth = this.state.viewDate.month();
    const calendarMonthWeeks = this.getCalendarMonthWeeks();
    const weekNodes = [];
    const currentTime = {
      hours: this.state.hours,
      minutes: this.state.minutes,
      seconds: this.state.seconds,
    };

    calendarMonthWeeks.forEach((week, weekKey) => {
      const dayNodes = [];

      week.forEach((day) => {
        let isOtherMonth = day.month() !== viewMonth;
        let key = day.format('YYYY-DD-MM');

        dayNodes.push(
          <DatePickerDay
            key={key}
            day={day}
            isOtherMonth={isOtherMonth}
            isActive={this.isActiveDay(day)}
            disabled={this.isDisabledDay(day)}
            onClickDate={this.props.onClickDate}
            currentTime={currentTime}
          >
            {day.date()}
          </DatePickerDay>);
      });

      weekNodes.push(<div key={weekKey} className="date-picker__week">{dayNodes}</div>);
    });

    return weekNodes;
  }

  renderTime() {
    if (!this.props.displayTime) {
      return null;
    }

    return (
      <div className="date-picker__time-container">
        <FormTextbox
          data-form-field="hours"
          onChange={this.onChangeTime}
          onFocus={this.onFocusTime}
          onBlur={this.onBlurTime}
          value={this.state.hours}
        />:
        <FormTextbox
          data-form-field="minutes"
          onChange={this.onChangeTime}
          onFocus={this.onFocusTime}
          onBlur={this.onBlurTime}
          value={this.state.minutes}
        />:
        <FormTextbox
          data-form-field="seconds"
          onChange={this.onChangeTime}
          onFocus={this.onFocusTime}
          onBlur={this.onBlurTime}
          value={this.state.seconds}
        />
      </div>
    );
  }

  renderClose() {
    if (!this.props.onClose) {
      return null;
    }

    return (
      <Button onClick={this.props.onClose}>Close</Button>
    );
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'onClickDate', 'selectedDays', 'minDate', 'maxDate', 'displayTime', 'onClose')}
      >
        <div className="date-picker__top-bar">
          <SvgIcon
            className="date-picker__previous-month"
            fragment="arrow-left"
            onClick={this.onClickPreviousMonth}
          />
          <div className="date-picker__top-bar-current">{this.state.viewDate.format('MMMM YYYY')}</div>
          <SvgIcon
            className="date-picker__next-month"
            fragment="arrow-right"
            onClick={this.onClickNextMonth}
          />
        </div>
        <div className="date-picker__days-of-week">
          <div className="date-picker__day-of-week">Su</div>
          <div className="date-picker__day-of-week">Mo</div>
          <div className="date-picker__day-of-week">Tu</div>
          <div className="date-picker__day-of-week">We</div>
          <div className="date-picker__day-of-week">Th</div>
          <div className="date-picker__day-of-week">Fr</div>
          <div className="date-picker__day-of-week">Sa</div>
        </div>
        <div className="date-picker__month">
          {this.renderCalendarMonthWeeks()}
        </div>
        {this.renderTime()}
        {this.renderClose()}
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: React.PropTypes.string,
  onClickDate: React.PropTypes.func.isRequired,
  selectedDays: React.PropTypes.array,
  minDate: React.PropTypes.object,
  maxDate: React.PropTypes.object,
  displayTime: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};

DatePicker.defaultProps = {
  className: null,
  onClickDate: null,
  selectedDays: [],
  minDate: null,
  maxDate: null,
  displayTime: true,
  onClose: null,
};

export default DatePicker;
