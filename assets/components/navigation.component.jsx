import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['nav'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isTabs) {
      cssClasses.push('nav-tabs');
    } else {
      cssClasses.push('nav-inline');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isTabs')}
      >
        {this.props.children}
      </div>
    );
  }
}

Navigation.displayName = 'Navigation';

Navigation.propTypes = {
  className: React.PropTypes.string,
  isTabs: React.PropTypes.bool
};

Navigation.defaultProps = {
  className: null,
  isTabs: false
};

export default Navigation;
