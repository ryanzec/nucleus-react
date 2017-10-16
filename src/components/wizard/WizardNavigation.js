import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

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

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, WizardNavigation.propTypes)}
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
  className: PropTypes.string
};

WizardNavigation.defaultProps = {
  className: null
};

export default WizardNavigation;
