import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/list/List.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[instance.props.styleType]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class List extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    styleType: PropTypes.oneOf(['plain']),
    type: PropTypes.oneOf(['ol', 'ul'])
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    styleType: null,
    type: 'ul'
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    const properties = {
      className: this.getCssClasses(),
    };
    Object.assign(properties, getPassThroughProperties(this.props, List.propTypes));
    return React.createElement(this.props.type, properties, this.props.children);
  }
}

export default List;
