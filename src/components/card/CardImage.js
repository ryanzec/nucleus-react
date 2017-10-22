import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['card__image'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class CardImage extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <img
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardImage.propTypes)}
      />
    );
  }
}

export default CardImage;
