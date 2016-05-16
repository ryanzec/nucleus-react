import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card-header'];

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

CardHeader.displayName = 'CardHeader';

CardHeader.propTypes = {
  className: React.PropTypes.string,
  elementType: React.PropTypes.string
};

CardHeader.defaultProps = {
  className: null,
  elementType: 'div'
};

export default CardHeader;
