import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class DatePickerDay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMonth: null,
      viewYear: null
    };

    this.onClick = this.onClick.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClick() {
    if (!this.props.disabled) {
      const newDate = this.props.day.clone();

      newDate.hours(this.props.currentTime.hours);
      newDate.minutes(this.props.currentTime.minutes);
      newDate.seconds(this.props.currentTime.seconds);

      this.props.onClickDate(newDate);
    }
  }

  getCssClasses() {
    let cssClasses = ['date-picker__day'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isOtherMonth) {
      cssClasses.push('m-other-month');
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    if (this.props.disabled) {
      cssClasses.push('is-disabled');
    }

    return cssClasses.join(' ');
  }

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

DatePickerDay.propTypes = {
  className: React.PropTypes.string,
  isOtherMonth: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  day: React.PropTypes.object.isRequired,
  onClickDate: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool,
  currentTime: React.PropTypes.object.isRequired,
};

DatePickerDay.defaultProps = {
  className: null,
  isOtherMonth: false,
  isActive: false,
  disabled: false,
};

export default DatePickerDay;
