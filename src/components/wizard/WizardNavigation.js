import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['wizard__navigation'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.state.isCollapsed) {
      cssClasses.push('is-collapsed');
    }

    return cssClasses.join(' ');
  };
};

export const createOnToggleCollapse = (instance) => {
  return () => {
    instance.setState({
      isCollapsed: !instance.state.isCollapsed,
    });
  };
};

class WizardNavigation extends React.Component {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isCollapsed: false,
    }
  }

  onToggleCollapse = createOnToggleCollapse(this);
  getCssClasses = createGetCssClasses(this);

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

export default WizardNavigation;
