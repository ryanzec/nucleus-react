var React = require('react');
var ReactDOM = require('react-dom');
var reactTestUtils = require('react-addons-test-utils');
var DatePicker = require('../../../../assets/components/date-picker.component.jsx');
var SvgIcon = require('../../../../assets/components/svg-icon.component.jsx');
var testHelper = require('../../../test-helper');

var testData = {};
var selectedDay = '01/02/2014';
var selectedStartOfWeek = '01/02/2014';

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
      <DatePicker selectedDay={this.state.selectedDay} />
    );
  }
});

var TestCloseOnClick = React.createClass({
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
      <DatePicker selectedDay={this.state.selectedDay} onClickDate={this.onClickDate} />
    );
  }
});

var TestDontCloseOnClick = React.createClass({
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
      <DatePicker selectedDay={this.state.selectedDay} onClickDate={this.onClickDate} closeOnClick={false} />
    );
  }
});

var TestWeekMode = React.createClass({
  getInitialState: function() {
    return {
      selectedStartOfWeek: selectedStartOfWeek
    };
  },

  onClickDate: function(value) {
    this.setState({
      selectedStartOfWeek: value
    });
  },

  render: function() {
    return (
      <DatePicker renderInputs={false} selectionUnit="week" selectedDay={this.state.selectedStartOfWeek} />
    );
  }
});

var TestCustomFormat = React.createClass({
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
      <DatePicker selectedDay={this.state.selectedDay} />
    );
  }
});

var TestCustomValidation = React.createClass({
  validators: [{
    validator: function(value) {
      return value === '01/08/2014';
    }
  }],

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
      <DatePicker
        selectedDay={this.state.selectedDay}
        onClickDate={this.onClickDate}
        renderValidation="both"
        validateOnLoad={true}
        validators={this.validators}
      />
    );
  }
});

describe('date picker component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);

      var datePicker = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'date-picker');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');

      expect(datePicker.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(input[0].getAttribute('placeholder')).to.equal('Click to select date');
      expect(calendar.length).to.equal(0);
      expect(label.length).to.equal(0);
    });

    it('should render week mode', function() {
      testData.component = ReactDOM.render(<DatePicker selectionUnit="week" />, div);

      var datePicker = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'date-picker');
      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');
      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');

      expect(datePicker.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(input[0].getAttribute('placeholder')).to.equal('Click to select date');
      expect(calendar.length).to.equal(0);
      expect(label.length).to.equal(0);
    });

    it('should not render inputs', function() {
      testData.component = ReactDOM.render(<DatePicker renderInputs={false}/>, div);

      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input');

      expect(input.length).to.equal(0);
    });

    it('should be able to add custom css classes', function() {
      testData.component = ReactDOM.render(<DatePicker className="m-safe" />, div);
      var datePicker = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'date-picker');

      expect(datePicker.className).to.contain('m-safe');
    });

    it('should render calendar when active', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar__header');

      expect(calendar.length).to.equal(1);
      expect(calendarHeader.textContent).to.equal('Select Date');
    });

    it('should disable calendar when signlePanelClose is called', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      testData.component.singlePanelClose();

      expect(testData.component.state.isCalendarActive).to.be.false;
    });

    it('should be able to set selected day', function() {
      testData.component = ReactDOM.render(<Test />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.value).to.equal(selectedDay);
    });

    it('should be able to set custom calendar header', function() {
      testData.component = ReactDOM.render(<DatePicker calendarHeaderText="Pick Date" />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar__header');

      expect(calendarHeader.textContent).to.equal('Pick Date');
    });

    it('should be able to set custom placeholder text', function() {
      testData.component = ReactDOM.render(<DatePicker placeholder="click me" />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.getAttribute('placeholder')).to.equal('click me');
    });

    it('should enable calendar when input is focused', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.focus(input);

      expect(testData.component.state.isCalendarActive).to.be.true;
    });

    it('should not enable calendar when input is focused if disabled', function() {
      testData.component = ReactDOM.render(<DatePicker disabled={true} />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.focus(input);

      expect(testData.component.state.isCalendarActive).to.be.false;
    });

    it('should not close calendar when the calendar itself is clicked on ', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      reactTestUtils.Simulate.focus(input);

      var calendar = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar');

      reactTestUtils.Simulate.click(calendar);

      expect(testData.component.state.isCalendarActive).to.be.true;
    });

    it('should blur input when single panel close occurs', function() {
      testData.component = ReactDOM.render(<DatePicker />, div);
      var append = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-append');

      reactTestUtils.Simulate.click(append);

      document.dispatchEvent(testHelper.createNativeKeyboardEvent({
        which: 27
      }));

      expect(document.activeElement).to.not.equal(ReactDOM.findDOMNode(testData.component.refs.input.refs.input));
    });

    it('should not close calendar when clicking date', function() {
      testData.component = ReactDOM.render(<TestDontCloseOnClick />, div);

      var input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input')[0];
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);

      expect(input.value).to.equal(selectedDay);

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: ReactDOM.findDOMNode(days[10])
      });

      input = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'input')[0];

      expect(input.value).to.equal('01/08/2014');
      expect(datePicker.state.isCalendarActive).to.be.true;
    });

    it('should close calendar when clicking date', function() {
      testData.component = ReactDOM.render(<TestCloseOnClick />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);

      expect(input.value).to.equal(selectedDay);

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: ReactDOM.findDOMNode(days[10])
      });

      input = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'input');

      expect(input.value).to.equal('01/08/2014');
      expect(datePicker.state.isCalendarActive).to.be.false;
    });

    it('toggle calendar when clicking svg icon', function() {
      testData.component = ReactDOM.render(<TestWeekMode />, div);
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);
      var svgIcon = reactTestUtils.findRenderedComponentWithType(datePicker, SvgIcon);

      expect(datePicker.state.isCalendarActive).to.be.false;

      reactTestUtils.Simulate.click(ReactDOM.findDOMNode(svgIcon));

      expect(datePicker.state.isCalendarActive).to.be.true;

      reactTestUtils.Simulate.click(ReactDOM.findDOMNode(svgIcon));

      expect(datePicker.state.isCalendarActive).to.be.false;
    });
  });
});
