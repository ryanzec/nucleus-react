import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-timezone';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import Button from 'src/components/button/Button';
import DatePickerDay from './DatePickerDay';
import FormTextbox from 'src/components/form/FormTextbox';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

import styles from 'src/components/date-picker/DatePicker.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createComponentWillReceiveProps = (instance) => {
  return (newProps) => {
    if (moment.isMoment(newProps.selectedDay)) {
      instance.setState({
        viewDate: newProps.selectedDay,
        hours: instance.convertTimeValueToString(newProps.selectedDay.hours()),
        minutes: instance.convertTimeValueToString(newProps.selectedDay.minutes()),
        seconds: instance.convertTimeValueToString(newProps.selectedDay.seconds()),
      });
    }
  };
};

export const createComponentWillMount = (instance) => {
  return () => {
    let viewDate;

    if (moment.isMoment(instance.props.selectedDay)) {
      viewDate = instance.props.selectedDay;
    } else {
      viewDate = moment();
    }

    instance.setState({
      viewDate
    });
  };
};

export const createOnClickNextMonth = (instance) => {
  return () => {
    instance.setState({
      viewDate: instance.state.viewDate.clone().add(1, 'month')
    });
  };
};

export const createOnClickPreviousMonth = (instance) => {
  return () => {
    instance.setState({
      viewDate: instance.state.viewDate.clone().subtract(1, 'month')
    });
  };
};

export const createOnFocusTime = (instance) => {
  return (event) => {
    const formField = event.target.getAttribute('data-form-field');

    if (parseInt(instance.state[formField], 10) === 0) {
      instance.setState({
        [formField]: '',
      });
    }
  };
};

export const createOnBlurTime = (instance) => {
  return (event) => {
    const formField = event.target.getAttribute('data-form-field');
    let newValue = instance.convertTimeValueToString(event.target.value);

    this.setState({
      [formField]: newValue,
    }, () => {
      let newDate;

      if (moment.isMoment(instance.props.selectedDay)) {
        newDate = instance.props.selectedDay.clone();
      } else {
        newDate = moment();
      }

      newDate.hours(instance.state.hours);
      newDate.minutes(instance.state.minutes);
      newDate.seconds(instance.state.seconds);

      instance.props.onClickDate(newDate);
    });
  };
};

export const createOnChangeTime = (instance) => {
  return (event) => {
    const formField = event.target.getAttribute('data-form-field');
    let newValue = instance.convertTimeValueToString(event.target.value, false);

    if (newValue > 24 && formField === 'hours') {
      newValue = '23';
    } else if (newValue > 60) {
      newValue = '59';
    }

    this.setState({
      [formField]: newValue,
    });
  };
};

export const createConvertTimeValueToString = () => {
  return (value, addLeadingZero = true) => {
    let parsedValue = parseInt(value, 10);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    }

    if (addLeadingZero) {
      return (parsedValue + '').length === 1 ? '0' + parsedValue : '' + parsedValue;
    } else {
      return parsedValue === 0 ? '' : '' + parsedValue;
    }
  };
};

export const createGetCalendarMonthWeeks = (instance) => {
  return () => {
    const baseMonth = instance.state.viewDate.month();
    const currentProcessingDay = instance.state.viewDate.clone().startOf('month').weekday(0);
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
  };
};

export const createIsActiveDay = (instance) => {
  return (day) => {
    let isActive = false;

    if (moment.isMoment(instance.props.selectedDay)) {
      if (isActive) {
        return;
      }

      if (day.diff(instance.props.selectedDay.clone().startOf('day'), 'days') === 0) {
        isActive = true;
      }
    }

    return isActive;
  };
};

export const createIsDisabledDay = (instance) => {
  return (day) => {
    let isDisabled = false;

    if (instance.props.minDate || instance.props.maxDate) {
      isDisabled = (
        (
          instance.props.minDate
          && instance.props.minDate.isAfter(day)
        )
        || (
          instance.props.maxDate
          && instance.props.maxDate.isBefore(day)
        )
      );
    }

    return isDisabled;
  };
};

class DatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    onClickDate: PropTypes.func.isRequired,
    selectedDay: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    displayTime: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    onClickDate: null,
    selectedDay: null,
    minDate: null,
    maxDate: null,
    displayTime: true,
    onClose: null,
  };

  constructor(props) {
    super(props);
    let startedSelectedDate;

    if (moment.isMoment(props.selectedDay)) {
      startedSelectedDate = props.selectedDay;
    }

    this.state = {
      viewDate: null,
      hours: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.hours()) : '00',
      minutes: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.minutes()) : '00',
      seconds: startedSelectedDate ? this.convertTimeValueToString(startedSelectedDate.seconds()) : '00',
    };
  }

  componentWillReceiveProps = createComponentWillMount(this);
  componentWillMount = createComponentWillMount(this);
  onClickNextMonth = createOnClickNextMonth(this);
  onClickPreviousMonth = createOnClickPreviousMonth(this);
  onFocusTime = createOnFocusTime(this);
  onBlurTime = createOnBlurTime(this);
  onChangeTime = createOnChangeTime(this);
  convertTimeValueToString = createConvertTimeValueToString();
  getCssClasses = createGetCssClasses(this);
  getCalendarMonthWeeks = createGetCalendarMonthWeeks(this);
  isActiveDay = createIsActiveDay(this);
  isDisabledDay = createIsDisabledDay(this);

  renderCalendarMonthWeeks() {
    const composedStyles = composeStyles(styles, this.props.customStyles);
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

      weekNodes.push(<div key={weekKey} className={composedStyles.week}>{dayNodes}</div>);
    });

    return weekNodes;
  }

  renderTime() {
    if (!this.props.displayTime) {
      return null;
    }

    const composedStyles = composeStyles(styles, this.props.customStyles);

    return (
      <div className={composedStyles.timeContainer}>
        <FormTextbox
          className={composedStyles.timeTextbox}
          data-form-field="hours"
          onChange={this.onChangeTime}
          onFocus={this.onFocusTime}
          onBlur={this.onBlurTime}
          value={this.state.hours}
        />:
        <FormTextbox
          className={composedStyles.timeTextbox}
          data-form-field="minutes"
          onChange={this.onChangeTime}
          onFocus={this.onFocusTime}
          onBlur={this.onBlurTime}
          value={this.state.minutes}
        />:
        <FormTextbox
          className={composedStyles.timeTextbox}
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

    const composedStyles = composeStyles(styles, this.props.customStyles);

    return (
      <Button className={composedStyles.button} onClick={this.props.onClose}>Close</Button>
    );
  }

  render() {
    const composedStyles = composeStyles(styles, this.props.customStyles);

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, DatePicker.propTypes)}
      >
        <div className={composedStyles.topBar}>
          <SvgIcon
            className={composedStyles.previousMonth}
            fragment="arrow-left"
            onClick={this.onClickPreviousMonth}
          />
          <div className={composedStyles.topBarMonthText}>{this.state.viewDate.format('MMMM YYYY')}</div>
          <SvgIcon
            className={composedStyles.nextMonth}
            fragment="arrow-right"
            onClick={this.onClickNextMonth}
          />
        </div>
        <div className={composedStyles.daysOfWeek}>
          <div className={composedStyles.dayOfWeek}>Su</div>
          <div className={composedStyles.dayOfWeek}>Mo</div>
          <div className={composedStyles.dayOfWeek}>Tu</div>
          <div className={composedStyles.dayOfWeek}>We</div>
          <div className={composedStyles.dayOfWeek}>Th</div>
          <div className={composedStyles.dayOfWeek}>Fr</div>
          <div className={composedStyles.dayOfWeek}>Sa</div>
        </div>
        <div className={composedStyles.daysContainer}>
          {this.renderCalendarMonthWeeks()}
        </div>
        {this.renderTime()}
        {this.renderClose()}
      </div>
    );
  }
}

export default DatePicker;
