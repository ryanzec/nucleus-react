import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class PopoverHandle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['popover__handle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <span
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, PopoverHandle.propTypes)}
      >
        {this.props.children}
      </span>
    );
  }
}

PopoverHandle.propTypes = {
  className: PropTypes.string
};

PopoverHandle.defaultProps = {
  className: null
};

export default PopoverHandle;
