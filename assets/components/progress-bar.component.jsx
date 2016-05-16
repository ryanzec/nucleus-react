import React from 'react';
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
    let cssClasses = ['progress'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push('progress-' + this.props.styleType);
    }

    if (this.props.isStriped) {
      cssClasses.push('progress-striped');
    }

    return cssClasses;
  }

  render() {
    return (
      <progress
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType', 'isStriped', 'isAnimated')}
      >{this.props.value / this.props.max}%}</progress>
    );
  }
}

ProgressBar.displayName = 'ProgressBar';

ProgressBar.propTypes = {
  className: React.PropTypes.string,
  value: React.PropTypes.number,
  max: React.PropTypes.number,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isStriped: React.PropTypes.bool
};

ProgressBar.defaultProps = {
  className: null,
  value: 0,
  max: 100,
  styleType: null,
  isStriped: false
};

export default ProgressBar;
