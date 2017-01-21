import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import isString from 'lodash/isString';

class Image extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorLoading: false
    };

    this.onError = this.onError.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onError() {
    this.setState({
      errorLoading: true
    });
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    let node = (
      <img
        role="presentation"
        className={this.getCssClasses().join(' ')}
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
  className: React.PropTypes.string,
  notFoundNode: React.PropTypes.node,
  src: React.PropTypes.string
};

Image.defaultProps = {
  className: null,
  notFoundNode: null,
  src: null
};

export default Image;
