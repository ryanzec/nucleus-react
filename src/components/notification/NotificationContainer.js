import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/notification/NotificationContainer.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[instance.props.position]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class NotificationContainer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    position: PropTypes.oneOf(['topTLft', 'topRight', 'bottomLeft', 'bottomRight']),
  };

  static defaultProps = {
    className: null,
    position: 'bottomLeft',
    customStyles: null,
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
