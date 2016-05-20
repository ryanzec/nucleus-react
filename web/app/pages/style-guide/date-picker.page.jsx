import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import DatePicker from 'react-datepicker';
import Form from '../../../../assets/components/form.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormGroup from '../../../../assets/components/form-group.component.jsx';
import FormInputGroup from '../../../../assets/components/form-input-group.component.jsx';
import FormInputGroupAddon from '../../../../assets/components/form-input-group-addon.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';

class DatePickerPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: null
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }

  render() {
    return (
      <div className="p-style-guide-date-picker">
        <h1 className="test">Date Picker</h1>
        <FormGroup>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="form-control"
                readOnly={true}
          />
        </FormGroup>
        <FormGroup>
          <FormInputGroup>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="form-control"
              readOnly={true}
            />
            <FormInputGroupAddon>C</FormInputGroupAddon>
          </FormInputGroup>
        </FormGroup>
        <p>Note that when using the date picker in an inline form, the labels get moved to the top with the current implementation</p>
        <Form isInline={true}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              className="form-control"
              readOnly={true}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormInputGroup>
              <DatePicker
                selected={this.state.startDate}
                onChange={this.handleChange}
                className="form-control"
                readOnly={true}
              />
              <FormInputGroupAddon>C</FormInputGroupAddon>
            </FormInputGroup>
          </FormGroup>
          <Button type="submit" styleType="primary">Send</Button>
        </Form>
      </div>
    );
  }
}

DatePickerPage.displayName = 'DatePickerPage';

DatePickerPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default DatePickerPage;
