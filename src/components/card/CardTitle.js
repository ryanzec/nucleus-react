import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class CardTitle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__title'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

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

CardTitle.propTypes = {
  className: PropTypes.string
};

CardTitle.defaultProps = {
  className: null,
};

export default CardTitle;
