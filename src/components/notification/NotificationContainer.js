import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['notification-container', `m-position-${instance.props.position}`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class NotificationContainer extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(['top-left', 'top-right', 'bottom-left', 'bottom-right'])
  };

  static defaultProps = {
    className: null,
    position: 'bottom-left'
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, NotificationContainer.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default NotificationContainer;
