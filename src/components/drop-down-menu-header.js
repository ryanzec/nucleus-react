import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class DropDownMenuHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['drop-down-menu__header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, DropDownMenuHeader.propTypes)}
      >
        {this.props.children}
      </div>
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
