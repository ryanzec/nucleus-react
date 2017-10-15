import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-timezone';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

import PopoverContainer from '../popover/PopoverContainer';
import FormTextbox from './FormTextbox';
import DatePicker from '../date-picker/DatePicker';

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

    return cssClasses.join(' ');
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
        className={this.getCssClasses()}
        isActive={this.state.isActive}
        {...getPassThroughProperties(this.props, FormDatePicker.propTypes)}
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
  className: PropTypes.string,
  onClick: PropTypes.func,
  selectedDay: PropTypes.object,
  onClickDate: PropTypes.func.isRequired,
  format: PropTypes.string,
};

FormDatePicker.defaultProps = {
  className: null,
  onClick: null,
  selectedDay: null,
  onClickDate: null,
  format: 'MMM Do, YYYY',

  //NOTE: popover defaults
  placement: 'top-end'
};

export default FormDatePicker;
