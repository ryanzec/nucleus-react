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

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  onError() {
    this.setState({
      errorLoading: true
    });
  }

  render() {
    var node = (
      <img
        className={this.getCssClasses().join(' ')}
        onError={this.onError}
        {...getPassThroughProperties(this.props, 'className', 'notFoundNode')}
      />
    );

    if (this.state.errorLoading === true || !this.props.src) {
      node = isString(this.props.notFoundNode) ? (<span>{this.props.notFoundNode}</span>) : this.props.notFoundNode;
    }

    return node;
  }
}

Image.displayName = 'Image';

Image.propTypes = {
  className: React.PropTypes.string,
  notFoundNode: React.PropTypes.node
};

Image.defaultProps = {
  className: null,
  notFoundNode: null
};

export default Image;
