var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var Calendar = require('../../../../assets/components/calendar.component.jsx');
var ExtendText = require('../../../../assets/components/extend-text.component.jsx');
var testHelper = require('../../../test-helper');
var moment = require('moment');
var fibers = require('fibers');

var currentDate = moment();
var currentMonth = currentDate.month();
var currentYear = currentDate.year();
var selectedDay = '01/13/2013';
var expectedChangedDay = '01/24/2013';
var selectedDayCustomFormat = '2013-01-13';
var expectedChangedDayCustomFormat= '2013-01-24';
var selectedDayWeekMode = '01/13/2013';
var expectedChangeDayWeekMode = '01/20/2013';
var expectedDays = [
  [[30, '12/30/2012'], [31, '12/31/2012'], [1, '01/01/2013'], [2, '01/02/2013'], [3, '01/03/2013'], [4, '01/04/2013'], [5, '01/05/2013']],
  [[6, '01/06/2013'], [7, '01/07/2013'], [8, '01/08/2013'], [9, '01/09/2013'], [10, '01/10/2013'], [11, '01/11/2013'], [12, '01/12/2013']],
  [[13, '01/13/2013'], [14, '01/14/2013'], [15, '01/15/2013'], [16, '01/16/2013'], [17, '01/17/2013'], [18, '01/18/2013'], [19, '01/19/2013']],
  [[20, '01/20/2013'], [21, '01/21/2013'], [22, '01/22/2013'], [23, '01/23/2013'], [24, '01/24/2013'], [25, '01/25/2013'], [26, '01/26/2013']],
  [[27, '01/27/2013'], [28, '01/28/2013'], [29, '01/29/2013'], [30, '01/30/2013'], [31, '01/31/2013'], [1, '02/01/2013'], [2, '02/02/2013']]
];
var expectedDaysCustomFormat = [
  [[30, '2012-12-30'], [31, '2012-12-31'], [1, '2013-01-01'], [2, '2013-01-02'], [3, '2013-01-03'], [4, '2013-01-04'], [5, '2013-01-05']],
  [[6, '2013-01-06'], [7, '2013-01-07'], [8, '2013-01-08'], [9, '2013-01-09'], [10, '2013-01-10'], [11, '2013-01-11'], [12, '2013-01-12']],
  [[13, '2013-01-13'], [14, '2013-01-14'], [15, '2013-01-15'], [16, '2013-01-16'], [17, '2013-01-17'], [18, '2013-01-18'], [19, '2013-01-19']],
  [[20, '2013-01-20'], [21, '2013-01-21'], [22, '2013-01-22'], [23, '2013-01-23'], [24, '2013-01-24'], [25, '2013-01-25'], [26, '2013-01-26']],
  [[27, '2013-01-27'], [28, '2013-01-28'], [29, '2013-01-29'], [30, '2013-01-30'], [31, '2013-01-31'], [1, '2013-02-01'], [2, '2013-02-02']]
];
var expectedDaysFeb2013 = [
  [27, 28, 29, 30, 31, 1, 2],
  [3, 4, 5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 1, 2]
];
var expectedDaysJan2014 = [
  [29, 30, 31, 1, 2, 3, 4],
  [5, 6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17, 18],
  [19, 20, 21, 22, 23, 24, 25],
  [26, 27, 28, 29, 30, 31, 1]
];
var expectedMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
var expectedDaysOfWeek = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
];
var expectedYears = [
  currentYear + 10,
  currentYear + 9,
  currentYear + 8,
  currentYear + 7,
  currentYear + 6,
  currentYear + 5,
  currentYear + 4,
  currentYear + 3,
  currentYear + 2,
  currentYear + 1,
  currentYear,
  currentYear - 1,
  currentYear - 2,
  currentYear - 3,
  currentYear - 4,
  currentYear - 5,
  currentYear - 6,
  currentYear - 7,
  currentYear - 8,
  currentYear - 9,
  currentYear - 10
];
var expectedYearsCustomPlus = [
  currentYear + 5,
  currentYear + 4,
  currentYear + 3,
  currentYear + 2,
  currentYear + 1,
  currentYear,
  currentYear - 1,
  currentYear - 2,
  currentYear - 3,
  currentYear - 4,
  currentYear - 5,
  currentYear - 6,
  currentYear - 7,
  currentYear - 8,
  currentYear - 9,
  currentYear - 10
];
var expectedYearsCustomMinus = [
  currentYear + 10,
  currentYear + 9,
  currentYear + 8,
  currentYear + 7,
  currentYear + 6,
  currentYear + 5,
  currentYear + 4,
  currentYear + 3,
  currentYear + 2,
  currentYear + 1,
  currentYear,
  currentYear - 1,
  currentYear - 2,
  currentYear - 3,
  currentYear - 4,
  currentYear - 5
];

var Test = React.createClass({
  getInitialState: function() {
    return {
      selectedDay: selectedDay
    };
  },

  onClickDate: function(value) {
    this.setState({
      selectedDay: value
    });
  },

  render: function() {
    return (
      <Calendar selectedDay={this.state.selectedDay} onClickDate={this.onClickDate} />
    );
  }
});

var TestWeekMode = React.createClass({
  getInitialState: function() {
    return {
      selectedStartOfWeek: selectedDayWeekMode
    };
  },

  onClickDate: function(value) {
    this.setState({
      selectedStartOfWeek: value
    });
  },

  render: function() {
    return (
      <Calendar selectionUnit="week" selectedDay={this.state.selectedStartOfWeek} onClickDate={this.onClickDate} />
    );
  }
});

var TestCustomFormat = React.createClass({
  getInitialState: function() {
    return {
      selectedDay: selectedDayCustomFormat
    };
  },

  onClickDate: function(value) {
    this.setState({
      selectedDay: value
    });
  },

  render: function() {
    return (
      <Calendar selectedDay={this.state.selectedDay} onClickDate={this.onClickDate} format="YYYY-MM-DD" />
    );
  }
});

describe('calendar component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('week mode', function() {
    it('should be add unit selection modifier class', function() {
      this.component = ReactDOM.render(<Calendar selectionUnit="week" selectedDay={selectedDay} showControls={false} headerText={null} />, div);
      var calendar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar');

      expect(calendar.className).to.contain('m-week-selection');
    });

    it('select the first day or the week when clicking on any first for that week', function() {
      this.component = ReactDOM.render(<TestWeekMode />, div);

      expect(this.component.state.selectedStartOfWeek).to.equal(selectedDayWeekMode);

      var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
      var days = weekRows[3].childNodes;

      reactTestUtils.Simulate.click(days[4], {
        target: ReactDOM.findDOMNode(days[4])
      });

      expect(this.component.state.selectedStartOfWeek).to.equal(expectedChangeDayWeekMode);
    });

    it('should not add selected class to selected day', function() {
      this.component = ReactDOM.render(<TestWeekMode />, div);

      expect(this.component.state.selectedStartOfWeek).to.equal(selectedDayWeekMode);

      var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
      var days = weekRows[2].childNodes;

      expect(days[0].getAttribute('data-date')).to.equal(selectedDayWeekMode);
      expect(days[0].className).to.not.contain('is-selected');
      expect(days[1].className).to.not.contain('is-selected');
      expect(days[2].className).to.not.contain('is-selected');
      expect(days[3].className).to.not.contain('is-selected');
      expect(days[4].className).to.not.contain('is-selected');
      expect(days[5].className).to.not.contain('is-selected');
      expect(days[6].className).to.not.contain('is-selected');
    });

    it('should add selected class to selected week', function() {
      this.component = ReactDOM.render(<TestWeekMode />, div);

      expect(this.component.state.selectedStartOfWeek).to.equal(selectedDayWeekMode);

      var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
      var days = weekRows[2].childNodes;

      expect(days[0].getAttribute('data-date')).to.equal(selectedDayWeekMode);
      expect(weekRows[0].className).to.not.contain('is-selected');
      expect(weekRows[1].className).to.not.contain('is-selected');
      expect(weekRows[2].className).to.contain('is-selected');
      expect(weekRows[3].className).to.not.contain('is-selected');
      expect(weekRows[4].className).to.not.contain('is-selected');
    });
  });

  it('should render', function() {
    this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={false} headerText={null} />, div);

    var daysOfWeekContainer = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__days-of-week');
    var daysOfWeek = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__day-of-week');
    var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
    var controls = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__controls');
    var header = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__header');

    expect(daysOfWeekContainer.length).to.equal(1);
    expect(weekRows.length).to.equal(5);
    expect(controls.length).to.equal(0);
    expect(header.length).to.equal(0);

    weekRows.forEach(function(weekRow, key) {
      var days = weekRow.childNodes;

      expect(days.length).to.equal(7);
      expect(parseInt(days[0].textContent)).to.equal(expectedDays[key][0][0]);
      expect(parseInt(days[1].textContent)).to.equal(expectedDays[key][1][0]);
      expect(parseInt(days[2].textContent)).to.equal(expectedDays[key][2][0]);
      expect(parseInt(days[3].textContent)).to.equal(expectedDays[key][3][0]);
      expect(parseInt(days[4].textContent)).to.equal(expectedDays[key][4][0]);
      expect(parseInt(days[5].textContent)).to.equal(expectedDays[key][5][0]);
      expect(parseInt(days[6].textContent)).to.equal(expectedDays[key][6][0]);

      if (key === 0) {
        expect(days[2].getAttribute('data-date')).to.equal(expectedDays[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDays[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDays[key][4][1]);
        expect(days[5].getAttribute('data-date')).to.equal(expectedDays[key][5][1]);
        expect(days[6].getAttribute('data-date')).to.equal(expectedDays[key][6][1]);
        expect(days[0].className).to.match(/m-previous-month/);
        expect(days[1].className).to.match(/m-previous-month/);
      } else if (key === 4) {
        expect(days[0].getAttribute('data-date')).to.equal(expectedDays[key][0][1]);
        expect(days[1].getAttribute('data-date')).to.equal(expectedDays[key][1][1]);
        expect(days[2].getAttribute('data-date')).to.equal(expectedDays[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDays[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDays[key][4][1]);
        expect(days[5].className).to.match(/m-next-month/);
        expect(days[6].className).to.match(/m-next-month/);
      } else {
        expect(days[0].getAttribute('data-date')).to.equal(expectedDays[key][0][1]);
        expect(days[1].getAttribute('data-date')).to.equal(expectedDays[key][1][1]);
        expect(days[2].getAttribute('data-date')).to.equal(expectedDays[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDays[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDays[key][4][1]);
        expect(days[5].getAttribute('data-date')).to.equal(expectedDays[key][5][1]);
        expect(days[6].getAttribute('data-date')).to.equal(expectedDays[key][6][1]);
      }
    }.bind(this));

    daysOfWeek.forEach(function(dayOfWeek, key) {
      expect(dayOfWeek.textContent).to.equal(expectedDaysOfWeek[key]);
    });
  });

  it('should be able to add custom class', function() {
    this.component = ReactDOM.render(<Calendar className="m-safe" selectedDay={selectedDay} showControls={false} headerText={null} />, div);
    var calendar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar');

    expect(calendar.className).to.contain('m-safe');
  });

  it('should be add unit selection modifier class', function() {
    this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={false} headerText={null} />, div);
    var calendar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar');

    expect(calendar.className).to.contain('m-day-selection');
  });

  it('should render controls', function() {
    this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={true} />, div);

    var controls = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__controls');
    var controlInputs = reactTestUtils.scryRenderedComponentsWithType(this.component, ExtendText);

    expect(controls.length).to.equal(1);
    expect(controlInputs.length).to.equal(2);
    expect(controlInputs[0].props.staticData.length).to.equal(12);
    expect(controlInputs[1].props.staticData.length).to.equal(21);

    expectedMonths.forEach(function(month, key) {
      expect(controlInputs[0].props.staticData[key].display).to.equal(month);
      expect(controlInputs[0].props.staticData[key].value).to.equal(key + 1);
    });

    expectedYears.forEach(function(year, key) {
      expect(controlInputs[1].props.staticData[key].display).to.equal(year);
      expect(controlInputs[1].props.staticData[key].value).to.equal(year);
    });
  });

  it('should render header', function() {
    this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} headerText="Header" />, div);

    var header = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__header');

    expect(header.length).to.equal(1);
    expect(header[0].textContent).to.equal('Header');
  });

  it('should be able to change month', function(done) {
    fibers(function() {
      this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={true} />, div);

      var controlInputs = reactTestUtils.scryRenderedComponentsWithType(this.component, ExtendText);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(controlInputs[0], 'extend-text__display-input');

      reactTestUtils.Simulate.focus(input);

      testHelper.sleep(5);

      reactTestUtils.Simulate.change(input, {
          target: {
              value: ''
          }
      });

      testHelper.sleep(5);

      var autoCompleteItems = reactTestUtils.scryRenderedDOMComponentsWithTag(controlInputs[0], 'li');

      reactTestUtils.Simulate.mouseDown(autoCompleteItems[1]);
      reactTestUtils.Simulate.blur(input);

      testHelper.sleep(5);

      expect(this.component.state.month).to.deep.equal({
        display: 'February',
        value: 2
      });

      var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');

      //weeks
      weekRows.forEach(function(weekRow, key) {
        var days = weekRow.childNodes;

        expect(days.length).to.equal(7);
        expect(parseInt(days[0].textContent)).to.equal(expectedDaysFeb2013[key][0]);
        expect(parseInt(days[1].textContent)).to.equal(expectedDaysFeb2013[key][1]);
        expect(parseInt(days[2].textContent)).to.equal(expectedDaysFeb2013[key][2]);
        expect(parseInt(days[3].textContent)).to.equal(expectedDaysFeb2013[key][3]);
        expect(parseInt(days[4].textContent)).to.equal(expectedDaysFeb2013[key][4]);
        expect(parseInt(days[5].textContent)).to.equal(expectedDaysFeb2013[key][5]);
        expect(parseInt(days[6].textContent)).to.equal(expectedDaysFeb2013[key][6]);
      });

      done();
    }).run();
  });

  it('should be able to change year', function(done) {
    fibers(function() {
      this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={true} />, div);

      var yearChangeCount = 0;
      var controlInputs = reactTestUtils.scryRenderedComponentsWithType(this.component, ExtendText);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(controlInputs[1], 'extend-text__display-input');

      do {
        yearChangeCount += 1;
        reactTestUtils.Simulate.focus(input);

        testHelper.sleep(5);

        reactTestUtils.Simulate.change(input, {
            target: {
                value: ''
            }
        });

        testHelper.sleep(5);

        var autoCompleteItems = reactTestUtils.scryRenderedDOMComponentsWithTag(controlInputs[1], 'li');

        reactTestUtils.Simulate.mouseDown(autoCompleteItems[10 + yearChangeCount]);
        reactTestUtils.Simulate.blur(input);

        testHelper.sleep(5);

      } while (currentYear - yearChangeCount !== 2014)


      expect(this.component.state.year).to.deep.equal({
        display: 2014,
        value: 2014
      });

      var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');

      //weeks
      weekRows.forEach(function(weekRow, key) {
        var days = weekRow.childNodes;

        expect(parseInt(days[0].textContent)).to.equal(expectedDaysJan2014[key][0]);
        expect(parseInt(days[1].textContent)).to.equal(expectedDaysJan2014[key][1]);
        expect(parseInt(days[2].textContent)).to.equal(expectedDaysJan2014[key][2]);
        expect(parseInt(days[3].textContent)).to.equal(expectedDaysJan2014[key][3]);
        expect(parseInt(days[4].textContent)).to.equal(expectedDaysJan2014[key][4]);
        expect(parseInt(days[5].textContent)).to.equal(expectedDaysJan2014[key][5]);
        expect(parseInt(days[6].textContent)).to.equal(expectedDaysJan2014[key][6]);
      });

      done();
    }).run();
  });

  it('should trigger onClickDate event', function() {
    this.component = ReactDOM.render(<Test />, div);

    expect(this.component.state.selectedDay).to.equal(selectedDay);

    var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
    var days = weekRows[3].childNodes;

    reactTestUtils.Simulate.click(days[4], {
      target: ReactDOM.findDOMNode(days[4])
    });

    expect(this.component.state.selectedDay).to.equal(expectedChangedDay);
  });

  it('should add selected class to selected day', function() {
    this.component = ReactDOM.render(<Test />, div);

    expect(this.component.state.selectedDay).to.equal(selectedDay);

    var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
    var days = weekRows[2].childNodes;

    expect(days[0].getAttribute('data-date')).to.equal(selectedDay);
    expect(days[0].className).to.contain('is-selected');
    expect(days[1].className).to.not.contain('is-selected');
    expect(days[2].className).to.not.contain('is-selected');
    expect(days[3].className).to.not.contain('is-selected');
    expect(days[4].className).to.not.contain('is-selected');
    expect(days[5].className).to.not.contain('is-selected');
    expect(days[6].className).to.not.contain('is-selected');
  });

  it('should add selected class to selected week', function() {
    this.component = ReactDOM.render(<Test />, div);

    expect(this.component.state.selectedDay).to.equal(selectedDay);

    var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');
    var days = weekRows[2].childNodes;

    expect(days[0].getAttribute('data-date')).to.equal(selectedDay);
    expect(weekRows[0].className).to.not.contain('is-selected');
    expect(weekRows[1].className).to.not.contain('is-selected');
    expect(weekRows[2].className).to.not.contain('is-selected');
    expect(weekRows[3].className).to.not.contain('is-selected');
    expect(weekRows[4].className).to.not.contain('is-selected');
  });

  it('should be able to use custom format', function() {
    this.component = ReactDOM.render(<TestCustomFormat />, div);

    expect(this.component.state.selectedDay).to.equal(selectedDayCustomFormat);

    var weekRows = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-row');

    //weeks
    weekRows.forEach(function(weekRow, key) {
      var days = weekRow.childNodes;

      if (key === 0) {
        expect(days[2].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][4][1]);
        expect(days[5].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][5][1]);
        expect(days[6].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][6][1]);
      } else if (key === 4) {
        expect(days[0].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][0][1]);
        expect(days[1].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][1][1]);
        expect(days[2].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][4][1]);
      } else {
        expect(days[0].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][0][1]);
        expect(days[1].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][1][1]);
        expect(days[2].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][2][1]);
        expect(days[3].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][3][1]);
        expect(days[4].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][4][1]);
        expect(days[5].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][5][1]);
        expect(days[6].getAttribute('data-date')).to.equal(expectedDaysCustomFormat[key][6][1]);
      }
    });

    var days = weekRows[3].childNodes;

    reactTestUtils.Simulate.click(days[4], {
      target: ReactDOM.findDOMNode(days[4])
    });

    expect(this.component.state.selectedDay).to.equal(expectedChangedDayCustomFormat);
  });

  it('should be able to set minus years', function(done) {
    fibers(function() {
      this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={true} minusYears={5} />, div);

      var controlInputs = reactTestUtils.scryRenderedComponentsWithType(this.component, ExtendText);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(controlInputs[1], 'extend-text__display-input');

      reactTestUtils.Simulate.focus(input);

      testHelper.sleep(5);

      reactTestUtils.Simulate.change(input, {
        target: {
          value: ''
        }
      });

      testHelper.sleep(5);

      var autoCompleteItems = reactTestUtils.scryRenderedDOMComponentsWithTag(controlInputs[1], 'li');

      expect(autoCompleteItems.length).to.equal(expectedYearsCustomMinus.length);

      expectedYearsCustomMinus.forEach(function(year, key) {
        expect(parseInt(ReactDOM.findDOMNode(autoCompleteItems[key]).textContent)).to.equal(year);
      });

      done();
    }).run();
  });

  it('should be able to set plus years', function() {
    fibers(function() {
      this.component = ReactDOM.render(<Calendar selectedDay={selectedDay} showControls={true} plusYears={5} />, div);

      var controlInputs = reactTestUtils.scryRenderedComponentsWithType(this.component, ExtendText);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(controlInputs[1], 'extend-text__display-input');

      reactTestUtils.Simulate.focus(input);

      testHelper.sleep(5);

      reactTestUtils.Simulate.change(input, {
        target: {
          value: ''
        }
      });

      testHelper.sleep(5);

      var autoCompleteItems = reactTestUtils.scryRenderedDOMComponentsWithTag(controlInputs[1], 'li');

      expect(autoCompleteItems.length).to.equal(expectedYearsCustomMinus.length);

      expectedYearsCustomPlus.forEach(function(year, key) {
        expect(parseInt(ReactDOM.findDOMNode(autoCompleteItems[key]).textContent)).to.equal(year);
      });

      done();
    }).run();
  });

  it('should correctly detect leap years', function() {
    this.component = ReactDOM.render(<Calendar />, div);

    expect(this.component.getDaysInMonth(2, 2014)).to.equal(28);
    expect(this.component.getDaysInMonth(2, 2016)).to.equal(29);
  });

  it('should be able to generate moment compatible dates', function() {
    this.component = ReactDOM.render(<Calendar />, div);

    expect(this.component.getMomentCompatibleDate(1, 2, 2014)).to.deep.equal({
      date: '01022014',
      format: 'DDMMYYYY'
    });
    expect(this.component.getMomentCompatibleDate(10, 11, 2014)).to.deep.equal({
      date: '10112014',
      format: 'DDMMYYYY'
    });
  });
});
