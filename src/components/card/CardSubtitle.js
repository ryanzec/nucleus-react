import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class CardSubtitle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__subtitle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <h5
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardSubtitle.propTypes)}
      >
        {this.props.children}
      </h5>
    );
  }
}

CardSubtitle.propTypes = {
  className: PropTypes.string
};

CardSubtitle.defaultProps = {
  className: null,
};

export default CardSubtitle;
