var React = require('react/addons');
var moment = require('moment');
var ExtendText = require('./extend-text.component.jsx');

var calendar = {};

calendar.displayName = 'Calendar';

calendar.mixins = [
  React.addons.PureRenderMixin
];

calendar.propTypes = {
  className: React.PropTypes.string,
  format: React.PropTypes.string,
  selectedDay: React.PropTypes.string,
  minusYears: React.PropTypes.number,
  plusYears: React.PropTypes.number,
  onClickDate: React.PropTypes.func,
  showControls: React.PropTypes.bool,
  headerText: React.PropTypes.string,
  selectionUnit: React.PropTypes.oneOf(['day', 'week', 'month']),
  defaultToCurrentDate: React.PropTypes.bool
};

calendar.getDefaultProps = function calendarGetDefaultProps() {
  return {
    className: null,
    format: 'MM/DD/YYYY',
    selectedDay: null,
    minusYears: 10,
    plusYears: 10,
    onClickDate: null,
    showControls: false,
    headerText: null,
    selectionUnit: 'day',
    defaultToCurrentDate: true
  };
};

calendar.getInitialState = function calendarGetInitialState() {
  return {
    month: null,
    year: null
  };
};

calendar.componentWillMount = function calendarComponentWillMount() {
  var momentDate = this.props.selectedDay ? moment(this.props.selectedDay, this.props.format) : moment();

  this.setState({
    month: momentDate.month() + 1,
    year: momentDate.year()
  });

  if (this.props.defaultToCurrentDate || this.props.selectedDay) {
    var momentDate = this.props.selectedDay ? moment(this.props.selectedDay, this.props.format) : moment();

    this.setState({
      month: {
        display: this.months[momentDate.month()],
        value: momentDate.month() + 1
      },
      year: {
        display: momentDate.year(),
        value: momentDate.year()
      }
    });
  }
};

calendar.monthDays = [
  31,
  28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31
];

calendar.months = [
  window.i18n['components/calendar'].january(),
  window.i18n['components/calendar'].february(),
  window.i18n['components/calendar'].march(),
  window.i18n['components/calendar'].april(),
  window.i18n['components/calendar'].may(),
  window.i18n['components/calendar'].june(),
  window.i18n['components/calendar'].july(),
  window.i18n['components/calendar'].august(),
  window.i18n['components/calendar'].september(),
  window.i18n['components/calendar'].october(),
  window.i18n['components/calendar'].november(),
  window.i18n['components/calendar'].december()
];

calendar.getCssClasses = function calendarGetCssClasses() {
  var cssClasses = ['calendar'];
  cssClasses.push('m-' + this.props.selectionUnit + '-selection');

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

calendar.getDaysInMonth = function calendarGetDaysInMonth(month, year) {
  var days = this.monthDays[month - 1];

  if (parseInt(month, 10) === 2 && parseInt(year, 10) % 4 === 0) {
    days = 29;
  }

  return days;
};

calendar.getDaysInPreviousMonth = function calendarGetDaysInPreviousMonth(month, year) {
  if (parseInt(month, 10) === 1) {
    month = 12;
    year -= 1;
  } else {
    month -= 1;
  }

  return this.getDaysInMonth(month, year);
};

calendar.getMomentCompatibleDate = function calendarGetMomentCompatibleDate(day, month, year) {
  var date = {
    date: '',
    format: 'DDMMYYYY'
  };

  if (parseInt(day, 10) < 10) {
    date.date += '0' + day;
  } else {
    date.date += day;
  }

  if (parseInt(month, 10) < 10) {
    date.date += '0' + month;
  } else {
    date.date += month;
  }

  date.date += year;

  return date;
};

calendar.getMonthOptions = function calendarGetMonthOptions() {
  var months = [];

  this.months.forEach(function calendarGetMonthOptionsMonthsLoop(month, key) {
    months.push({
      display: month,
      value: key + 1
    });
  });

  return months;
};

calendar.getYearOptions = function calendarGetYearOptions() {
  var yearToAdd = moment().year() - this.props.minusYears;
  var lastYear = yearToAdd + this.props.minusYears + this.props.plusYears;
  var years = [];

  for (yearToAdd; yearToAdd <= lastYear; yearToAdd += 1) {
    years.push({
      display: yearToAdd,
      value: yearToAdd
    });
  }

  years.reverse();

  return years;
};

calendar.onChangeMonth = function calendarOnChangeMonth(value) {
  this.setState({
    month: value
  }, function calendarOnChangeMonthSetStateCallback() {
    this.onClickDateMonthUnit();
  });
};

calendar.onChangeYear = function calendarOnChangeYear(value) {
  this.setState({
    year: value
  }, function calendarOnChangeYearSetStateCallback() {
    this.onClickDateMonthUnit();
  });
};

calendar.onClickDateMonthUnit = function calendarOnClickDateMonthUnit() {
  /* istanbul ignore else */
  if (this.props.selectionUnit === 'month' && this.state.month.value && this.state.year.value) {
    var month = this.state.month.value.length === 1 ? '0' + this.state.month.value : this.state.month.value;
    var date = moment(this.state.year.value + '-' + month + '-01', 'YYYY-MM-DD');

    this.props.onClickDate(date.format(this.props.format));
  }
};

calendar.onClickDate = function calendarOnClickDate(event) {
  /* istanbul ignore else */
  if (this.props.onClickDate) {
    var clickedDate = moment(event.target.getAttribute('data-date'), this.props.format);

    if (this.props.selectionUnit === 'week') {
      clickedDate.startOf('week');
    }

    this.props.onClickDate(clickedDate.format(this.props.format));
  }
};

calendar.renderHeader = function calendarRenderHeader() {
  var header = null;

  if (this.props.headerText) {
    header = (
      <header className="calendar__header">
        {this.props.headerText}
      </header>
    );
  }

  return header;
};

calendar.renderControls = function calendarRenderControls() {
  var controls = null;

  if (this.props.showControls === true) {
    controls = (
      <div className="calendar__controls" hasGutter={false}>
        <div className="calendar__control">
          <ExtendText
            placeholder="Select month"
            dropDownIconFragment="chevron-down"
            staticDataFilter={function formInputsProfileAvailabilityStaticDataFilter(value, data) {
                return data;
            }}
            staticData={this.getMonthOptions()}
            value={this.state.month}
            onChange={this.onChangeMonth}
          />
        </div>
        <div className="calendar__control">
          <ExtendText
            placeholder="Select year"
            dropDownIconFragment="chevron-down"
            staticDataFilter={function formInputsProfileAvailabilityStaticDataFilter(value, data) {
                return data;
            }}
            staticData={this.getYearOptions()}
            value={this.state.year}
            onChange={this.onChangeYear}
          />
        </div>
      </div>
    );
  }

  return controls;
};

calendar.renderWeeks = function calendarRenderWeeks() {
  var daysInPreviousMonth = this.getDaysInPreviousMonth(this.state.month.value, this.state.year.value);
  var daysInMonth = this.getDaysInMonth(this.state.month.value, this.state.year.value);
  var momentDateObject = this.getMomentCompatibleDate(1, this.state.month.value, this.state.year.value);
  var firstDayOfMonth = (moment(momentDateObject.date, momentDateObject.format).day());
  var currentMomentDateObject;
  var extraDayCssClass = '';
  var selectedWeekIndex;
  var dayKey = 1;
  var weeks = [];
  var days = [];

  for (var x = 0; x < daysInMonth + firstDayOfMonth; x += 1) {
    if (days.length === 7) {
      weeks.push(days);
      days = [];
    }

    if (weeks.length === 0 && x < firstDayOfMonth) {
      days.push(
        <div
          key={dayKey}
          className="calendar__week-day m-previous-month"
        >
          {daysInPreviousMonth - (firstDayOfMonth - x - 1)}
        </div>
      );
    } else {
      currentMomentDateObject = this.getMomentCompatibleDate(x + 1 - firstDayOfMonth, this.state.month.value, this.state.year.value);

      extraDayCssClass = '';

      if (moment(currentMomentDateObject.date, currentMomentDateObject.format).format(this.props.format) === this.props.selectedDay) {
        if (this.props.selectionUnit === 'day') {
          extraDayCssClass = ' is-selected';
        } else {
          selectedWeekIndex = weeks.length;
        }
      }

      days.push(
        <div
          key={dayKey}
          className={'calendar__week-day' + extraDayCssClass}
          onClick={this.onClickDate}
          data-date={moment(currentMomentDateObject.date, currentMomentDateObject.format).format(this.props.format)}
        >
          {x + 1 - firstDayOfMonth}
        </div>
      );
    }

    dayKey += 1;
  }

  var nextMonthDay = 1;

  while (days.length < 7) {
    days.push(
      <div
        key={dayKey}
        className="calendar__week-day m-next-month"
      >
        {nextMonthDay}
      </div>
    );
    nextMonthDay += 1;
    dayKey += 1;
  }

  weeks.push(days);

  return weeks.map(function calendarRenderWeeksWeeksLoop(weekDays, key) {
    var extraCssClass = key === selectedWeekIndex ? ' is-selected' : '';
    return (
      <div
        key={key}
        className={'calendar__week-row' + extraCssClass}
      >
        {weekDays}
      </div>
    );
  });
};

calendar.renderCalendar = function calendarRenderCalendar() {
    var calendar = null;

    if (this.state.month && this.state.year && this.props.selectionUnit !== 'month') {
      calendar = (
        <div className="calendar__calendar">
          <div hasGutter={false} className="calendar__days-of-week">
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].sundayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].mondayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].tuesdayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].wednesdayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].thursdayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].fridayFirstLetter()}</div>
            <div className="calendar__day-of-week">{window.i18n['components/calendar'].saturdayFirstLetter()}</div>
          </div>
          {this.renderWeeks()}
        </div>
      );
    }

    return calendar;
};

calendar.render = function calendarRender() {
  return (
    <div
      className={this.getCssClasses().join(' ')}
    >
      {this.renderHeader()}
      {this.renderControls()}
      {this.renderCalendar()}
    </div>
  );
};

module.exports = React.createClass(calendar);
