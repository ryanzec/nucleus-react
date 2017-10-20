import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['badge'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    if (instance.props.isPill) {
      cssClasses.push('m-pill');
    }

    if (instance.props.isThin) {
      cssClasses.push('m-thin');
    }

    return cssClasses.join(' ');
  };
};

class Badge extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    isPill: PropTypes.bool,
    isThin: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    styleType: null,
    isPill: false,
    isThin: false,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Badge.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Badge;
