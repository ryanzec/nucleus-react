import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
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

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentWillMount() {
    let startingDay;

    if (this.props.selectedDays.length > 0) {
      viewDate = this.props.selectedDays[0];
    } else {
      viewDate = moment();
    }

    this.setState({
      viewDate: viewDate
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
    let baseMonth = this.state.viewDate.month();
    let currentProcessingDay = this.state.viewDate.clone().startOf('month').weekday(0);

    let calendarMonthWeeks = [];

    do {
      let weekDays = [];

      for(let x = 0; x < 7; x += 1) {
        weekDays.push(currentProcessingDay.clone());

        currentProcessingDay.add(1, 'days');
      }

      calendarMonthWeeks.push(weekDays);
    } while (currentProcessingDay.month() === baseMonth);

    return calendarMonthWeeks;
  }

  isActiveDay(day) {
    let isActive = false;

    if (this.props.selectedDays.length > 0) {
      this.props.selectedDays.forEach((selectedDay) => {
        if (isActive) {
          return;
        }

        if (day.diff(selectedDay, 'days') === 0) {
          isActive = true;
        }

        console.log(day.diff(selectedDay, 'days'));
      });
    }

    return isActive;
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

  renderCalendarMonthWeeks() {
    let viewMonth = this.state.viewDate.month();
    let calendarMonthWeeks = this.getCalendarMonthWeeks();

    var weekNodes = [];

    calendarMonthWeeks.forEach((week, weekKey) => {
      let dayNodes = [];

      week.forEach((day) => {
        let isOtherMonth = day.month() !== viewMonth;
        let key = day.format('YYYY-DD-MM');

        dayNodes.push(
          <DatePickerDay
            key={key}
            day={day}
            isOtherMonth={isOtherMonth}
            isActive={this.isActiveDay(day)}
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
        {...getPassThroughProperties(this.props, 'className')}
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

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  className: React.PropTypes.string,
  onClickDate: React.PropTypes.func.isRequired,
  selectedDays: React.PropTypes.array
};

DatePicker.defaultProps = {
  className: null,
  onClickDate: null,
  selectedDays: []
};

export default DatePicker;














