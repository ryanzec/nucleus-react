import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['notification'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    if (instance.props.isFilled) {
      cssClasses.push('m-filled');
    }

    if (instance.props.hasShadow) {
      cssClasses.push('m-shadow');
    }

    return cssClasses.join(' ');
  };
};

class Notification extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    isFilled: PropTypes.bool,
    hasShadow: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    styleType: 'success',
    isFilled: false,
    hasShadow: false
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Notification.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Notification;
