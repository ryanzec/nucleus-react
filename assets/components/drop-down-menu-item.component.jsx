import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class DropDownMenuItem extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['dropdown-item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isDisabled) {
      cssClasses.push('disabled');
    }

    return cssClasses;
  }

  render() {
    return (
      <a
        className={this.getCssClasses().join(' ')}
        href="#"
        {...getPassThroughProperties(this.props, 'className', 'isDisabled')}
      >
        {this.props.children}
      </a>
    );
  }
}

DropDownMenuItem.displayName = 'DropDownMenuItem';

DropDownMenuItem.propTypes = {
  className: React.PropTypes.string,
  isDisabled: React.PropTypes.bool
};

DropDownMenuItem.defaultProps = {
  className: null,
  isDisabled: false
};

export default DropDownMenuItem;
