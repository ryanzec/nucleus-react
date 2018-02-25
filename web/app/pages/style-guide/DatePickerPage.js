import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-timezone';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import DatePicker from '../../../../src/components/date-picker/DatePicker';

class DatePickerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDay: moment(),
    };
  }

  onClickDate = day => {
    this.setState({
      selectedDay: day,
    })
  };

  render() {
    return (
      <div className="p-style-guide-date-picker">
        <h1>Date Picker</h1>
        <h2>Basic</h2>
        <div>
          <p>Selected day: {this.state.selectedDay.format('MM/DD/YYYY HH:mm:ssZ')}</p>
          <DatePicker
            onClickDate={this.onClickDate}
            selectedDay={this.state.selectedDay}
            minDate={moment().subtract('20', 'day')}
            maxDate={moment().add('20', 'day')}
          />
        </div>
      </div>
    );
  }
}

DatePickerPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default DatePickerPage;
