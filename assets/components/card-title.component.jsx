import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card-title'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return React.createElement(
      this.props.elementType,
      Object.assign({
        className: this.getCssClasses().join(' ')
      }, getPassThroughProperties(this.props, 'className', 'elementType')),
      this.props.children
    );
  }
}

CardTitle.displayName = 'CardTitle';

CardTitle.propTypes = {
  className: React.PropTypes.string,
  elementType: React.PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
};

CardTitle.defaultProps = {
  className: null,
  elementType: 'h4'
};

export default CardTitle;
