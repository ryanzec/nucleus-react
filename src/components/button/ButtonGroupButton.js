import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import Button from 'src/components/button/Button';

import styles from 'src/components/button/Button.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [styles[instance.props.styleType]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isPill) {
      cssClasses.push(styles.pill);
    }

    if (instance.props.isThin) {
      cssClasses.push(styles.thin);
    }

    return cssClasses.join(' ');
  };
};

class ButtonGroupButton extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['default', 'success', 'info', 'warning', 'danger', 'link']),
    isPill: PropTypes.bool,
    isThin: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <Button
        {...getPassThroughProperties(this.props, ButtonGroupButton.propTypes)}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default ButtonGroupButton;
