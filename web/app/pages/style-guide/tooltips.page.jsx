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

import Tooltip from '../../../../assets/components/tooltip.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormSelect from '../../../../assets/components/form-select.component.jsx';
import FormSelectOption from '../../../../assets/components/form-select-option.component.jsx';

class TooltipsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTooltip: false,
      attachmentPosition: 'top'
    };

    this.onMouseOverTooltipHandle = this.onMouseOverTooltipHandle.bind(this);
    this.onMouseOutTooltipHandle = this.onMouseOutTooltipHandle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onMouseOverTooltipHandle() {
    this.setState({
      showTooltip: true
    });
  }

  onMouseOutTooltipHandle() {
    this.setState({
      showTooltip: false
    });
  }

  onChange(event) {
    this.setState({
      attachmentPosition: event.target.value
    });
  }

  render() {
    return (
      <div className="p-style-guide-tooltips">
        <h1 className="test">Tooltips</h1>
        <FormLabel>Attachment</FormLabel>
        <FormSelect onChange={this.onChange} value={this.state.attachmentPosition}>
          <FormSelectOption value="top">top</FormSelectOption>
          <FormSelectOption value="bottom">bottom</FormSelectOption>
          <FormSelectOption value="left">left</FormSelectOption>
          <FormSelectOption value="right">right</FormSelectOption>
        </FormSelect>
        <Tooltip
          isActive={this.state.showTooltip}
          attachment={this.state.attachmentPosition}
        >
          <Button className="tooltip-toggle" onMouseOver={this.onMouseOverTooltipHandle} onMouseOut={this.onMouseOutTooltipHandle}>Handle</Button>
          <span>
            <div className="tooltip-arrow"></div>
            <div className="tooltip-inner">Tooltip Content</div>
          </span>
        </Tooltip>
      </div>
    );
  }
}

TooltipsPage.displayName = 'TooltipsPage';

TooltipsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default TooltipsPage;
