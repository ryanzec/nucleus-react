import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardSubtitle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__subtitle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <h5
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, CardSubtitle.propTypes)}
      >
        {this.props.children}
      </h5>
    );
  }
}

CardSubtitle.propTypes = {
  className: React.PropTypes.string
};

CardSubtitle.defaultProps = {
  className: null,
};

export default CardSubtitle;
