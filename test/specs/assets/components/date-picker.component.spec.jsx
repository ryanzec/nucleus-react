var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var DatePicker = require('../../../../assets/components/date-picker.component.jsx');
var SvgIcon = require('../../../../assets/components/svg-icon.component.jsx');
var formMixin = require('../../../../assets/mixins/form.mixin');
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

var TestCloseOnClick = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      test: {
        selectedDay: selectedDay
      }
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      test: {
        selectedDay: {
          component: DatePicker,
          valueProperty: 'selectedDay',
          hasOnChange: false,
          props: {
            onClickDate: this.onClickDate,
            closeOnClick: false
          }
        }
      }
    };
  },

  onClickDate: function(value) {
    this.setState({
      test: {
        selectedDay: value
      }
    });
  },

  render: function() {
    var inputs = this.getInputs('test');
    return inputs.selectedDay.render();
  }
});

var TestFormSystem = React.createClass({
  mixins: [
    formMixin
  ],

  getInitialState: function() {
    return {
      test: {
        selectedDay: selectedDay
      }
    };
  },

  componentWillMount: function() {
    this.formInputs = {
      test: {
        selectedDay: {
          component: DatePicker,
          valueProperty: 'selectedDay',
          hasOnChange: false,
          props: {
            onClickDate: this.onClickDate,
          }
        }
      }
    };
  },

  onClickDate: function(value) {
    this.setState({
      test: {
        selectedDay: value
      }
    });
  },

  render: function() {
    var inputs = this.getInputs('test');
    return inputs.selectedDay.render();
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

  describe('validation', function() {
    it('should properly set the internal inputs validation props to utilize its validation code', function() {
      testData.component = React.render(<TestCustomValidation />, div);
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);

      expect(datePicker.refs.input.props.renderValidation).to.equal('both');
      expect(datePicker.refs.input.props.validateOnLoad).to.be.true;
      expect(datePicker.refs.input.props.validators).to.deep.equal(TestCustomValidation.prototype.validators);
      expect(datePicker.validator).to.equal(datePicker.refs.input.validator);
    });

    it('should trigger input validator when clicking on date', function() {
      testData.component = React.render(<TestCustomValidation />, div);
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);
      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(datePicker.validator.valid).to.be.false;

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: days[10].getDOMNode()
      });

      expect(datePicker.validator.valid).to.be.true;
    });
  });

  describe('general', function() {
    it('should render', function() {
      testData.component = React.render(<DatePicker />, div);

      var datePicker = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'date-picker');
      var input = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'm-text');
      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');

      expect(datePicker.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(input[0].props.placeholder).to.equal('Click to select date');
      expect(calendar.length).to.equal(0);
      expect(label.length).to.equal(0);
    });

    it('should render week mode', function() {
      testData.component = React.render(<DatePicker selectionUnit="week" />, div);

      var datePicker = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'date-picker');
      var input = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'm-text');
      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var label = reactTestUtils.scryRenderedDOMComponentsWithTag(testData.component, 'label');

      expect(datePicker.length).to.equal(1);
      expect(input.length).to.equal(1);
      expect(input[0].props.placeholder).to.equal('Click to select date');
      expect(calendar.length).to.equal(0);
      expect(label.length).to.equal(0);
    });

    it('should not render inputs', function() {
      testData.component = React.render(<DatePicker renderInputs={false}/>, div);

      var input = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'm-text');

      expect(input.length).to.equal(0);
    });

    it('should be able to add custom css classes', function() {
      testData.component = React.render(<DatePicker className="m-safe" />, div);
      var datePicker = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'date-picker');

      expect(datePicker.props.className).to.contain('m-safe');
    });

    it('should render label', function() {
      testData.component = React.render(<DatePicker label="test" />, div);
      var label = reactTestUtils.findRenderedDOMComponentWithTag(testData.component, 'label');

      expect(label.props.children).to.equal('test');
    });

    it('should render calendar when active', function() {
      testData.component = React.render(<DatePicker />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar');
      var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar__header');

      expect(calendar.length).to.equal(1);
      expect(calendarHeader.props.children).to.equal('Select Date');
    });

    it('should disable calendar when signlePanelClose is called', function() {
      testData.component = React.render(<DatePicker />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      testData.component.singlePanelClose();

      expect(testData.component.state.isCalendarActive).to.be.false;
    });

    it('should be able to set selected day', function() {
      testData.component = React.render(<Test />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.value).to.equal(selectedDay);
    });

    it('should be able to set custom calendar header', function() {
      testData.component = React.render(<DatePicker calendarHeaderText="Pick Date" />, div);

      testData.component.setState({
        isCalendarActive: true
      });

      var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar__header');

      expect(calendarHeader.props.children).to.equal('Pick Date');
    });

    it('should be able to set custom placeholder text', function() {
      testData.component = React.render(<DatePicker placeholder="click me" />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.placeholder).to.equal('click me');
    });

    it('should enable calendar when input is focused', function() {
      testData.component = React.render(<DatePicker />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      reactTestUtils.Simulate.focus(input);

      expect(testData.component.state.isCalendarActive).to.be.true;
    });

    it('should not close calendar when the calendar itself is clicked on ', function() {
      testData.component = React.render(<DatePicker />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      reactTestUtils.Simulate.focus(input);

      var calendar = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'calendar');

      reactTestUtils.Simulate.click(calendar);

      expect(testData.component.state.isCalendarActive).to.be.true;
    });

    it('should blur input when single panel close occurs', function() {
      testData.component = React.render(<DatePicker />, div);
      var append = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'form-element__input-append');

      reactTestUtils.Simulate.click(append);

      document.dispatchEvent(testHelper.createNativeKeyboardEvent({
        which: 27
      }));

      expect(document.activeElement).to.not.equal(testData.component.refs.input.refs.input.getDOMNode());
    });

    it('should work within the form system', function() {
      testData.component = React.render(<TestFormSystem />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.value).to.equal(selectedDay);

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: days[10].getDOMNode()
      });

      input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.value).to.equal('01/08/2014');
    });

    it('should not close calendar when clicking date', function() {
      testData.component = React.render(<TestCloseOnClick />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);

      expect(input.props.value).to.equal(selectedDay);

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: days[10].getDOMNode()
      });

      input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.value).to.equal('01/08/2014');
      expect(datePicker.state.isCalendarActive).to.be.true;
    });

    it('should close calendar when clicking date', function() {
      testData.component = React.render(<TestFormSystem />, div);

      var input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);

      expect(input.props.value).to.equal(selectedDay);

      reactTestUtils.Simulate.focus(input);

      var days = reactTestUtils.scryRenderedDOMComponentsWithClass(testData.component, 'calendar__week-day');

      reactTestUtils.Simulate.click(days[10], {
        target: days[10].getDOMNode()
      });

      input = reactTestUtils.findRenderedDOMComponentWithClass(testData.component, 'm-text');

      expect(input.props.value).to.equal('01/08/2014');
      expect(datePicker.state.isCalendarActive).to.be.false;
    });


    it('toggle calendar when clicking svg icon', function() {
      testData.component = React.render(<TestWeekMode />, div);
      var datePicker = reactTestUtils.findRenderedComponentWithType(testData.component, DatePicker);
      var svgIcon = reactTestUtils.findRenderedComponentWithType(datePicker, SvgIcon);

      expect(datePicker.state.isCalendarActive).to.be.false;

      reactTestUtils.Simulate.click(svgIcon.getDOMNode());

      expect(datePicker.state.isCalendarActive).to.be.true;

      reactTestUtils.Simulate.click(svgIcon.getDOMNode());

      expect(datePicker.state.isCalendarActive).to.be.false;
    });
  });
});
