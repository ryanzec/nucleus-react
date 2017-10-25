import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment-timezone';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/form/FormDatePicker.module.scss';

import PopoverContainer from 'src/components/popover/PopoverContainer';
import FormTextbox from './FormTextbox';
import DatePicker from 'src/components/date-picker/DatePicker';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createOnFocus = (instance) => {
  return () => {
    instance.setState({
      isActive: true
    });
  };
};

export const createOnClose = (instance) => {
  return () => {
    instance.setState({
      isActive: false
    });
  };
};

export const createGetInputValue = (instance) => {
  return () => {
    let inputValue = '';

    if (moment.isMoment(instance.props.selectedDay)) {
      inputValue = instance.props.selectedDay.format(instance.props.format);
    }

    return inputValue;
  };
};

class FormDatePicker extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    selectedDay: PropTypes.object,
    onClickDate: PropTypes.func.isRequired,
    format: PropTypes.string,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    onClick: null,
    selectedDay: null,
    onClickDate: null,
    format: 'MMM Do, YYYY',
    placement: 'top-end',
    customStyles: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }

  onFocus = createOnFocus(this);
  onClose = createOnClose(this);
  getCssClasses = createGetCssClasses(this);
  getInputValue = createGetInputValue(this);

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

export default FormDatePicker;
