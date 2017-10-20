import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['date-picker__day'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isOtherMonth) {
      cssClasses.push('m-other-month');
    }

    if (instance.props.isActive) {
      cssClasses.push('is-active');
    }

    if (instance.props.disabled) {
      cssClasses.push('is-disabled');
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

class DatePickerDay extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isOtherMonth: PropTypes.bool,
    isActive: PropTypes.bool,
    day: PropTypes.object.isRequired,
    onClickDate: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    currentTime: PropTypes.object.isRequired,
  };

  static defaultProps = {
    className: null,
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
