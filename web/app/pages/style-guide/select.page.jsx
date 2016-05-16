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

import Select from 'react-select';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

class SelectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      disabled: false
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div className="p-style-guide-select">
        <h1 className="test">Select</h1>
        <Select
          multi
          simpleValue
          disabled={this.state.disabled}
          value={this.state.value}
          placeholder="Select your favourite(s)"
          options={FLAVOURS}
          onChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

SelectPage.displayName = 'SelectPage';

SelectPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SelectPage;
