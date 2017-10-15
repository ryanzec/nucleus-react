import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class TableHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table__header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <thead
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, TableHeader.propTypes)}
      >
        {this.props.children}
      </thead>
    );
  }
}

TableHeader.propTypes = {
  className: PropTypes.string
};

TableHeader.defaultProps = {
  className: null
};

export default TableHeader;
