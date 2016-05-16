import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class DropDownMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['dropdown-menu'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.align === 'right') {
      cssClasses.push('dropdown-menu-right');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'align')}
      >
        {this.props.children}
      </div>
    );
  }
}

DropDownMenu.displayName = 'DropDownMenu';

DropDownMenu.propTypes = {
  className: React.PropTypes.string,
  align: React.PropTypes.oneOf(['left', 'right'])
};

DropDownMenu.defaultProps = {
  className: null,
  align: 'left'
};

export default DropDownMenu;
