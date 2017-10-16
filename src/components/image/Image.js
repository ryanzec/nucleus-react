import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';
import isString from 'lodash/isString';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorLoading: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onError = () => {
    this.setState({
      errorLoading: true
    });
  };

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    let node = (
      <img
        role="presentation"
        className={this.getCssClasses()}
        onError={this.onError}
        {...getPassThroughProperties(this.props, Image.propTypes, 'src')}
      />
    );

    if (this.state.errorLoading === true || !this.props.src) {
      node = isString(this.props.notFoundNode) ? (<span>{this.props.notFoundNode}</span>) : this.props.notFoundNode;
    }

    return node;
  }
}

Image.propTypes = {
  className: PropTypes.string,
  notFoundNode: PropTypes.node,
  src: PropTypes.string
};

Image.defaultProps = {
  className: null,
  notFoundNode: null,
  src: null
};

export default Image;
