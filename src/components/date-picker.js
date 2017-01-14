import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import moment from 'moment-timezone';

import SvgIcon from './svg-icon';
import DatePickerDay from './date-picker-day';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewDate: null
    };

    this.onClickNextMonth = this.onClickNextMonth.bind(this);
    this.onClickPreviousMonth = this.onClickPreviousMonth.bind(this);
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

  onClickNextMonth() {
    this.setState({
      viewDate: this.state.viewDate.clone().add(1, 'month')
    });
  }

  onClickPreviousMonth() {
    this.setState({
      viewDate: this.state.viewDate.clone().subtract(1, 'month')
    });
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
          >
            {day.date()}
          </DatePickerDay>);
      });

      weekNodes.push(<div key={weekKey} className="date-picker__week">{dayNodes}</div>);
    });

    return weekNodes;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'onClickDate', 'selectedDays', 'minDate', 'maxDate')}
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
      </div>
    );
  }
}

DatePicker.propTypes = {
  className: React.PropTypes.string,
  onClickDate: React.PropTypes.func.isRequired,
  selectedDays: React.PropTypes.array,
  minDate: React.PropTypes.object,
  maxDate: React.PropTypes.object
};

DatePicker.defaultProps = {
  className: null,
  onClickDate: null,
  selectedDays: [],
  minDate: null,
  maxDate: null
};

export default DatePicker;
