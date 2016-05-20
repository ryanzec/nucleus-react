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

import Popover from '../../../../assets/components/popover.component.jsx';
import PopoverContentWrapper from '../../../../assets/components/popover-content-wrapper.component.jsx';
import PopoverContent from '../../../../assets/components/popover-content.component.jsx';
import PopoverTitle from '../../../../assets/components/popover-title.component.jsx';
import PopoverArrow from '../../../../assets/components/popover-arrow.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormSelect from '../../../../assets/components/form-select.component.jsx';
import FormSelectOption from '../../../../assets/components/form-select-option.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';

class PopoversPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      attachmentPosition: 'top',
      popoverIsActive: false
    };

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.onClickOutside = this.onClickOutside.bind(this)
  }

  onChange(event) {
    this.setState({
      attachmentPosition: event.target.value
    });
  }

  onClick() {
    this.setState({
      popoverIsActive: !this.state.popoverIsActive
    })
  }

  onClickOutside() {
    this.setState({
      popoverIsActive: false
    })
  }

  render() {
    return (
      <div className="p-style-guide-popovers">
        <h1 className="test">Popovers</h1>
        <FormLabel>Attachment</FormLabel>
        <FormSelect onChange={this.onChange} value={this.state.attachmentPosition}>
          <FormSelectOption value="top">top</FormSelectOption>
          <FormSelectOption value="bottom">bottom</FormSelectOption>
          <FormSelectOption value="left">left</FormSelectOption>
          <FormSelectOption value="right">right</FormSelectOption>
        </FormSelect>
        <Popover
          attachment={this.state.attachmentPosition}
          isActive={this.state.popoverIsActive}
          onClickOutside={this.onClickOutside}
        >
          <Button className="popover-toggle" onClick={this.onClick}>Test</Button>
          <PopoverContentWrapper>
            <PopoverArrow />
            <PopoverTitle>title</PopoverTitle>
            <PopoverContent>content</PopoverContent>
          </PopoverContentWrapper>
        </Popover>
      </div>
    );
  }
}

PopoversPage.displayName = 'PopoversPage';

PopoversPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default PopoversPage;
