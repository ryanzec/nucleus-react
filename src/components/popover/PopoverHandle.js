import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['popover__handle'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class PopoverHandle extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  static defaultProps = {
    className: null
  };

  getCssClasses = createGetCssClasses(this);

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

export default PopoverHandle;
