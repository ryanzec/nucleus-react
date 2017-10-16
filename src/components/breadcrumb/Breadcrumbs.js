import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class Breadcrumbs extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['breadcrumbs'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Breadcrumbs.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  className: PropTypes.string
};

Breadcrumbs.defaultProps = {
  className: null
};

export default Breadcrumbs;
