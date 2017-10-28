import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/wizard/WizardNavigiation.module.scss';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isCollapsed) {
      cssClasses.push(composedStyles.isCollapsed);
    }

    return cssClasses.join(' ');
  };
};

class WizardNavigation extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    isCollapsed: PropTypes.bool,
    onToggleCollapse: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isCollapsed: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, WizardNavigation.propTypes)}
      >
        {this.props.children}
        <SvgIcon
          fragment={this.props.isCollapsed ? 'caret-right' : 'caret-left'}
          onClick={this.props.onToggleCollapse}
        />
      </div>
    );
  }
}

export default WizardNavigation;
