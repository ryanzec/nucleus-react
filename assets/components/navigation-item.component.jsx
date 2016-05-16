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
    let cssClasses = ['nav-link'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    if (this.props.isDisabled) {
      cssClasses.push('disabled');
    }

    return cssClasses;
  }

  render() {
    return (
      <span className="nav-item">
        <a
          href="#"
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, 'className', 'isActive', 'isDisabled')}
        >
          {this.props.children}
        </a>
      </span>
    );
  }
}

Navigation.displayName = 'Navigation';

Navigation.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  isDisabled: React.PropTypes.bool
};

Navigation.defaultProps = {
  className: null,
  isActive: false,
  isDisabled: false
};

export default Navigation;
