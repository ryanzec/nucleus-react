import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class CardLink extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['card-link'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <a
        className={this.getCssClasses().join(' ')}
        href="#"
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </a>
    );
  }
}

CardLink.displayName = 'CardLink';

CardLink.propTypes = {
  className: React.PropTypes.string
};

CardLink.defaultProps = {
  className: null
};

export default CardLink;
