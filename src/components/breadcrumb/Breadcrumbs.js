import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/breadcrumb/Breadcrumbs.module.scss';

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

class Breadcrumbs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Breadcrumbs.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Breadcrumbs;
