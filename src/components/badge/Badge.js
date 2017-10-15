import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class Badge extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['badge'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isPill) {
      cssClasses.push('m-pill');
    }

    if (this.props.isThin) {
      cssClasses.push('m-thin');
    }

    return cssClasses.join(' ');
  }

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

Badge.propTypes = {
  className: PropTypes.string,
  styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isPill: PropTypes.bool,
  isThin: PropTypes.bool
};

Badge.defaultProps = {
  className: null,
  styleType: null,
  isPill: false,
  isThin: false
};

export default Badge;
