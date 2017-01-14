import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardTitle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card__title'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <h4
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </h4>
    );
  }
}

CardTitle.propTypes = {
  className: React.PropTypes.string
};

CardTitle.defaultProps = {
  className: null,
};

export default CardTitle;
