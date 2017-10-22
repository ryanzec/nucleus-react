import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import Card from 'src/components/card/Card';

import styles from 'src/components/card/ColumnCard.module.scss';

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

class ColumnCard extends React.Component {
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
      <Card
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ColumnCard.propTypes)}
      >
        {this.props.children}
      </Card>
    );
  }
}

export default ColumnCard;
