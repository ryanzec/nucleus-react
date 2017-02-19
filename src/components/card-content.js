import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class CardContent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__content'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, CardContent.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

CardContent.propTypes = {
  className: React.PropTypes.string
};

CardContent.defaultProps = {
  className: null,
};

export default CardContent;
