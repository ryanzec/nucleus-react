import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['progress-bar'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push('m-' + this.props.styleType);
    }

    if (this.props.isStriped) {
      cssClasses.push('m-striped');
    }

    return cssClasses;
  }

  render() {
    return (
      <progress
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType')}
      >
        {this.props.children}
      </progress>
    );
  }
}

ProgressBar.displayName = 'ProgressBar';

ProgressBar.propTypes = {
  className: React.PropTypes.string,
  styleType: customPropTypes.progressBarStyleTypes,
  isStriped: React.PropTypes.bool
};

ProgressBar.defaultProps = {
  className: null,
  styleType: null,
  isStriped: false,

  //NOTE: native property defaults
  max: 100,
  value: 0
};

export default ProgressBar;
