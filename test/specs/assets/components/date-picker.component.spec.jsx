var React = require('react/addons');
var reactTestUtils = React.addons.TestUtils;
var DatePicker = require('../../../../assets/components/date-picker.component.jsx');
var formMixin = require('../../../../assets/mixins/form.mixin');
var testHelper = require('../../../test-helper');

var selectedDay = '01/02/2014';

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

describe('date picker component', function() {
  var div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = React.render(<DatePicker />, div);

    var datePicker = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'date-picker');
    var input = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'm-text');
    var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar');

    expect(datePicker.length).to.equal(1);
    expect(input.length).to.equal(1);
    expect(input[0].props.placeholder).to.equal('Click to select date');
    expect(calendar.length).to.equal(0);
  });

  it('should render calendar when active', function() {
    this.component = React.render(<DatePicker />, div);

    this.component.setState({
      isCalendarActive: true
    });

    var calendar = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar');
    var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar__header');

    expect(calendar.length).to.equal(1);
    expect(calendarHeader.props.children).to.equal('Select Date');
  });

  it('should disable calendar when signlePanelClose is called', function() {
    this.component = React.render(<DatePicker />, div);

    this.component.setState({
      isCalendarActive: true
    });

    this.component.singlePanelClose();

    expect(this.component.state.isCalendarActive).to.be.false;
  });

  it('should be able to set selected day', function() {
    this.component = React.render(<Test />, div);

    var input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    expect(input.props.value).to.equal(selectedDay);
  });

  it('should be able to set custom calendar header', function() {
    this.component = React.render(<DatePicker calendarHeaderText="Pick Date" />, div);

    this.component.setState({
      isCalendarActive: true
    });

    var calendarHeader = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar__header');

    expect(calendarHeader.props.children).to.equal('Pick Date');
  });

  it('should be able to set custom placeholder text', function() {
    this.component = React.render(<DatePicker placeholder="click me" />, div);

    var input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    expect(input.props.placeholder).to.equal('click me');
  });

  it('should enable calendar when input is focused', function() {
    this.component = React.render(<DatePicker />, div);

    var input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    reactTestUtils.Simulate.focus(input);

    expect(this.component.state.isCalendarActive).to.be.true;
  });

  it('should not close calendar when the calendar itself is clicked on ', function() {
    this.component = React.render(<DatePicker />, div);

    var input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    reactTestUtils.Simulate.focus(input);

    var calendar = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'calendar');

    reactTestUtils.Simulate.click(calendar);

    expect(this.component.state.isCalendarActive).to.be.true;
  });

  it('should blur input when single panel close occurs', function() {
    this.component = React.render(<DatePicker />, div);
    var append = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'form-element__input-append');

    reactTestUtils.Simulate.click(append);

    document.dispatchEvent(testHelper.createNativeKeyboardEvent({
      which: 27
    }));

    expect(document.activeElement).to.not.equal(this.component.refs.input.refs.input.getDOMNode());
  });

  it('should work within the form system', function() {
    this.component = React.render(<TestFormSystem />, div);

    var input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    expect(input.props.value).to.equal(selectedDay);

    reactTestUtils.Simulate.focus(input);

    var days = reactTestUtils.scryRenderedDOMComponentsWithClass(this.component, 'calendar__week-day');

    reactTestUtils.Simulate.click(days[10], {
      target: days[10].getDOMNode()
    });

    input = reactTestUtils.findRenderedDOMComponentWithClass(this.component, 'm-text');

    expect(input.props.value).to.equal('01/08/2014');
  });
});
