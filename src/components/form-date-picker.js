import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import PopoverContainer from './popover-container';
import FormTextbox from './form-textbox';
import DatePicker from './date-picker';

class FormDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onFocus = () => {
    this.setState({
      isActive: true
    });
  }

  onClose = () => {
    this.setState({
      isActive: false
    });
  }

  getCssClasses() {
    let cssClasses = ['form-element__date-picker'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  getInputValue() {
    let inputValue = '';

    if (this.props.selectedDays.length > 0) {
      inputValue = this.props.selectedDays[0].format(this.props.format);
    }

    return inputValue;
  }

  render() {
    return (
      <PopoverContainer
        className={this.getCssClasses().join(' ')}
        isActive={this.state.isActive}
        {...getPassThroughProperties(this.props, 'className', 'onClick', 'selectedDays', 'onClickDate')}
      >
        <FormTextbox
          onFocus={this.onFocus}
          value={this.getInputValue()}
          readOnly
        />
        <DatePicker
          selectedDays={this.props.selectedDays}
          onClickDate={this.props.onClickDate}
          onClose={this.onClose}
        />
      </PopoverContainer>
    );
  }
}

FormDatePicker.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  selectedDays: React.PropTypes.array,
  onClickDate: React.PropTypes.func.isRequired,
  format: React.PropTypes.string
};

FormDatePicker.defaultProps = {
  className: null,
  onClick: null,
  selectedDays: [],
  onClickDate: null,
  format: 'MMM Do, YYYY',

  //NOTE: popover defaults
  attachment: 'top left',
  targetAttachment: 'bottom left'
};

export default FormDatePicker;
