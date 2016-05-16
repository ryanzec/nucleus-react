import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import customPropTypes from '../utilities/component/custom-prop-types';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import Button from './button.component.jsx';

class DropDownToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['dropdown-toggle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <Button
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'buttonStyle')}
      >
        {this.props.children}
      </Button>
    );
  }
}

DropDownToggle.displayName = 'DropDownToggle';

DropDownToggle.propTypes = {
  className: React.PropTypes.string,
  onClick: React.PropTypes.func,
  buttonStyle: customPropTypes.buttonStyleTypes
};

DropDownToggle.defaultProps = {
  className: null,
  onClick: null,
  styleType: 'secondary'
};

export default DropDownToggle;
