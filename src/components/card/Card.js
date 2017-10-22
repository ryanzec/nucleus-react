import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/card/Card.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(composedStyles[instance.props.styleType]);
    }

    return cssClasses.join(' ');
  };
};

class Card extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    styleType: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Card.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Card;
