import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import Button from 'src/components/button/Button';

import styles from 'src/components/button/ButtonGroupButton.module.scss';

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

class ButtonGroupButton extends React.Component {
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
      <Button
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ButtonGroupButton.propTypes)}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default ButtonGroupButton;
