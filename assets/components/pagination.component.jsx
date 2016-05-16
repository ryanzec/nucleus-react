import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Pagination extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['pagination'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.size) {
      cssClasses.push('pagination-' + this.props.size);
    }

    return cssClasses;
  }

  render() {
    return (
      <nav>
        <ul
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, 'className', 'size')}
        >
          {this.props.children}
        </ul>
      </nav>
    );
  }
}

Pagination.displayName = 'Pagination';

Pagination.propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.oneOf(['sm', 'lg'])
};

Pagination.defaultProps = {
  className: null
};

export default Pagination;
