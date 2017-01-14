import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

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
    if (!this.props.disabled && this.props.onClickDate) {
      this.props.onClickDate(this.props.day);
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

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        onClick={this.onClick}
        {...getPassThroughProperties(this.props, 'className', 'isOtherMonth', 'isActive', 'day', 'onClickDate', 'disabled')}
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
  onClickDate: React.PropTypes.func,
  disabled: React.PropTypes.bool
};

DatePickerDay.defaultProps = {
  className: null,
  isOtherMonth: false,
  isActive: false,
  day: null,
  onClickDate: null,
  disabled: false
};

export default DatePickerDay;
