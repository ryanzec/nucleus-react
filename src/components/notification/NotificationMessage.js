import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['notification__message'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class NotificationMessage extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, NotificationMessage.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default NotificationMessage;
