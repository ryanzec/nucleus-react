import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return ()  => {
    let cssClasses = ['table__footer-item', 'table__data-item'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.alignment) {
      cssClasses.push(`m-${instance.props.alignment}`);
    }

    return cssClasses.join(' ');
  };
};

class TableFooterItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    alignment: PropTypes.oneOf(['left', 'right', 'center']),
  };

  static defaultProps = {
    className: null,
    alignment: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <td
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableFooterItem.propTypes)}
      >
        {this.props.children}
      </td>
    );
  }
}

export default TableFooterItem;
