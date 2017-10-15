import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class ProgressBar extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['progress-bar'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isStriped) {
      cssClasses.push('m-striped');
    }

    if (!this.props.isSquare) {
      cssClasses.push('m-pill');
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <progress
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ProgressBar.propTypes)}
      >
        {this.props.children}
      </progress>
    );
  }
}

ProgressBar.propTypes = {
  className: PropTypes.string,
  styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isStriped: PropTypes.bool,
  isSquare: PropTypes.bool
};

ProgressBar.defaultProps = {
  className: null,
  styleType: null,
  isStriped: false,
  isSquare: false,

  //NOTE: native property defaults
  max: 100,
  value: 0
};

export default ProgressBar;
