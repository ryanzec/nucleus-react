import React from 'react';
import moment from 'moment-timezone';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import DatePicker from '../../../../src/components/date-picker';

class DatePickerPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDays: [moment()]
    };

    this.onClickDate = this.onClickDate.bind(this);
  }

  onClickDate(day) {
    this.setState({
      selectedDays: [day]
    })
  }

  render() {
    return (
      <div className="p-style-guide-date-picker">
        <h1>Date Picker</h1>
        <h2>Basic</h2>
        <div>
          <p>Selected day: {this.state.selectedDays[0].format('MM/DD/YYYY HH:mm:ssZ')}</p>
          <DatePicker
            onClickDate={this.onClickDate}
            selectedDays={this.state.selectedDays}
            minDate={moment().subtract('20', 'day')}
            maxDate={moment().add('20', 'day')}
          />
        </div>
      </div>
    );
  }
}

DatePickerPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DatePickerPage;
