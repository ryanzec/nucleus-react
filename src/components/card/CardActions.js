import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties,} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['card__actions'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class CardActions extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardActions.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default CardActions;
