import React from 'react';
import moment from 'moment-timezone';
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

    if (moment.isMoment(this.props.selectedDay)) {
      inputValue = this.props.selectedDay.format(this.props.format);
    }

    return inputValue;
  }

  render() {
    return (
      <PopoverContainer
        className={this.getCssClasses().join(' ')}
        isActive={this.state.isActive}
        {...getPassThroughProperties(this.props, 'className', 'onClick', 'selectedDay', 'onClickDate')}
      >
        <FormTextbox
          onFocus={this.onFocus}
          value={this.getInputValue()}
          readOnly
        />
        <DatePicker
          selectedDay={this.props.selectedDay}
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
  selectedDay: React.PropTypes.object,
  onClickDate: React.PropTypes.func.isRequired,
  format: React.PropTypes.string
};

FormDatePicker.defaultProps = {
  className: null,
  onClick: null,
  selectedDay: null,
  onClickDate: null,
  format: 'MMM Do, YYYY',

  //NOTE: popover defaults
  attachment: 'top left',
  targetAttachment: 'bottom left'
};

export default FormDatePicker;
