import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class DropDownMenuHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['list__item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <li
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </li>
    );
  }
}

DropDownMenuHeader.propTypes = {
  className: React.PropTypes.string
};

DropDownMenuHeader.defaultProps = {
  className: null
};

export default DropDownMenuHeader;
