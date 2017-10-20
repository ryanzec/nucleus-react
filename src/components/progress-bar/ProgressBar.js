import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['progress-bar'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    if (instance.props.isStriped) {
      cssClasses.push('m-striped');
    }

    if (!instance.props.isSquare) {
      cssClasses.push('m-pill');
    }

    return cssClasses.join(' ');
  };
};

class ProgressBar extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    isStriped: PropTypes.bool,
    isSquare: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    styleType: null,
    isStriped: false,
    isSquare: false,
    max: 100,
    value: 0
  };

  getCssClasses = createGetCssClasses(this);

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

export default ProgressBar;
