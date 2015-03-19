var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var DatePicker = nucleusReact.components.DatePicker;
var FlexRow = nucleusReact.components.FlexRow;
var FlexCell = nucleusReact.components.FlexCell;

var Example = React.createClass({
  getInitialState: function() {
    return {
      selectedDay1: '01/10/2015',
      selectedDay2: ''
    };
  },

  onClickDate1: function(value) {
    this.setState({
      selectedDay1: value
    });
  },

  onClickDate2: function(value) {
    this.setState({
      selectedDay2: value
    });
  },

  render: function() {
    return (
      <span>
        <FlexRow>
          <FlexCell>
            <DatePicker
              selectedDay={this.state.selectedDay1}
              onClickDate={this.onClickDate1} />
          </FlexCell>
          <FlexCell>
            <DatePicker
              selectedDay={this.state.selectedDay2}
              onClickDate={this.onClickDate2} />
          </FlexCell>
        </FlexRow>
        <div>
          just some content after the date picker for visual testing purposes
        </div>
      </span>
    );
  }
});

module.exports = {
  name: 'Date Picker',
  type: 'component',
  overview: (
    <p>
      Date picker.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Standard badge.
      </p>
    ),
    example: (
      <Example />
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
