import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class DropDownMenu extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['drop-down-menu'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, DropDownMenu.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

DropDownMenu.propTypes = {
  className: React.PropTypes.string
};

DropDownMenu.defaultProps = {
  className: null
};

export default DropDownMenu;
