import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardImage extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__image'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <image
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      />
    );
  }
}

CardImage.displayName = 'CardImage';

CardImage.propTypes = {
  className: React.PropTypes.string
};

CardImage.defaultProps = {
  className: null,
};

export default CardImage;
