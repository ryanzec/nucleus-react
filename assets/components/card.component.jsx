import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isInverse) {
      cssClasses.push('card-inverse');
    }

    if (this.props.styleType) {
      cssClasses.push('card-' + this.props.styleType);
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isInverse', 'styleType')}
      >
        {this.props.children}
      </div>
    );
  }
}

Card.displayName = 'Card';

Card.propTypes = {
  className: React.PropTypes.string,
  isInverse: React.PropTypes.bool,
  styleType: React.PropTypes.oneOf(['primary', 'success', 'info', 'warning', 'danger'])
};

Card.defaultProps = {
  className: null,
  isInverse: false,
  styleType: null
};

export default Card;
