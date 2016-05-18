import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class DropDownMenuHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['dropdown-header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <h6
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </h6>
    );
  }
}

DropDownMenuHeader.displayName = 'DropDownMenuHeader';

DropDownMenuHeader.propTypes = {
  className: React.PropTypes.string
};

DropDownMenuHeader.defaultProps = {
  className: null
};

export default DropDownMenuHeader;
