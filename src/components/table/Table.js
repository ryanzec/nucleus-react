import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['table', `m-${instance.props.alignment}`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    if (instance.props.isVertical) {
      cssClasses.push('is-vertical');
    }

    return cssClasses.join(' ');
  };
};

class Table extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'right', 'center']),
    styleType: PropTypes.oneOf(['zebra', 'borderless']),
    isVertical: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    alignment: 'center',
    styleType: null,
    isVertical: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <table
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Table.propTypes)}
      >
        {this.props.children}
      </table>
    );
  }
}

export default Table;
