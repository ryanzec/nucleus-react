import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class CardImage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__image'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <img
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardImage.propTypes)}
      />
    );
  }
}

CardImage.propTypes = {
  className: PropTypes.string
};

CardImage.defaultProps = {
  className: null,
};

export default CardImage;
