import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['card__title'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class CardTitle extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <h4
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardTitle.propTypes)}
      >
        {this.props.children}
      </h4>
    );
  }
}

export default CardTitle;
