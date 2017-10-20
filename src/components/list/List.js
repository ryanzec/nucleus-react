import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['list'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    return cssClasses.join(' ');
  };
};

class List extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['plain']),
    type: PropTypes.oneOf(['ol', 'ul'])
  };

  static defaultProps = {
    className: null,
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
