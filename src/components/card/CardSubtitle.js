import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/card/CardSubtitle.module.scss';

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

class CardSubtitle extends React.Component {
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
      <h5
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardSubtitle.propTypes)}
      >
        {this.props.children}
      </h5>
    );
  }
}

export default CardSubtitle;
