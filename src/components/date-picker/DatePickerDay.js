import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/date-picker/DatePickerDay.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isOtherMonth) {
      cssClasses.push(composedStyles.notCurrentMonth);
    }

    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    if (instance.props.disabled) {
      cssClasses.push(composedStyles.isDisabled);
    }

    return cssClasses.join(' ');
  };
};

export const createOnClick = (instance) => {
  return () => {
    if (!instance.props.disabled) {
      const newDate = instance.props.day.clone();

      newDate.hours(instance.props.currentTime.hours);
      newDate.minutes(instance.props.currentTime.minutes);
      newDate.seconds(instance.props.currentTime.seconds);

      instance.props.onClickDate(newDate);
    }
  };
};

class DatePickerDay extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isOtherMonth: PropTypes.bool,
    isActive: PropTypes.bool,
    day: PropTypes.object.isRequired,
    onClickDate: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    currentTime: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isOtherMonth: false,
    isActive: false,
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      viewMonth: null,
      viewYear: null
    };
  }

  onClick = createOnClick(this);
  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        onClick={this.onClick}
        {...getPassThroughProperties(this.props, DatePickerDay.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default DatePickerDay;
