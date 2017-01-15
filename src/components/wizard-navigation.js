import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class WizardNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: false,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onToggleCollapse = () => {
    this.setState({
      isCollapsed: !this.state.isCollapsed,
    });
  }

  getCssClasses() {
    let cssClasses = ['wizard__navigation'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.state.isCollapsed) {
      cssClasses.push('is-collapsed');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
        <SvgIcon
          fragment={this.state.isCollapsed ? 'caret-right' : 'caret-left'}
          onClick={this.onToggleCollapse}
        />
      </div>
    );
  }
}

WizardNavigation.propTypes = {
  className: React.PropTypes.string
};

WizardNavigation.defaultProps = {
  className: null
};

export default WizardNavigation;
