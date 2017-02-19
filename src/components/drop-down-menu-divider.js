import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class DropDownMenuDivider extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['drop-down-menu__divider'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, DropDownMenuDivider.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

DropDownMenuDivider.propTypes = {
  className: React.PropTypes.string
};

DropDownMenuDivider.defaultProps = {
  className: null
};

export default DropDownMenuDivider;
