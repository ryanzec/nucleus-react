import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const getInitialState = () => {
  return {
    errorLoading: false
  };
};

import isString from 'lodash/isString';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['image'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createOnError = (instance) => {
  return () => {
    instance.setState({
      errorLoading: true
    });
  };
};

class Image extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    notFoundNode: PropTypes.node,
    src: PropTypes.string
  };

  static defaultProps = {
    className: null,
    notFoundNode: null,
    src: null
  };

  state = getInitialState();

  onError = createOnError(this);
  getCssClasses = createGetCssClasses(this);

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

export default Image;
