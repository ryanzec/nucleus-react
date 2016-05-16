import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isHidden) {
      cssClasses.push('sr-only');
    }

    if (this.props.useControlStyle) {
      cssClasses.push('form-control-label');
    }

    if (this.props.extraSmallSize) {
      cssClasses.push('col-xs-' + this.props.extraSmallSize);
    }

    if (this.props.smallSize) {
      cssClasses.push('col-sm-' + this.props.smallSize);
    }

    if (this.props.mediumSize) {
      cssClasses.push('col-md-' + this.props.mediumSize);
    }

    if (this.props.largeSize) {
      cssClasses.push('col-lg-' + this.props.largeSize);
    }

    if (this.props.extraLargeSize) {
      cssClasses.push('col-xl-' + this.props.extraLargeSize);
    }

    if (this.props.extraSmallOffset) {
      cssClasses.push('col-xs-offset-' + this.props.extraSmallOffset);
    }

    if (this.props.smallOffset) {
      cssClasses.push('col-sm-offset-' + this.props.smallOffset);
    }

    if (this.props.mediumOffset) {
      cssClasses.push('col-md-offset-' + this.props.mediumOffset);
    }

    if (this.props.largeOffset) {
      cssClasses.push('col-lg-offset-' + this.props.largeOffset);
    }

    if (this.props.extraLargeOffset) {
      cssClasses.push('col-xl-offset-' + this.props.extraLargeOffset);
    }

    if (this.props.extraSmallPush) {
      cssClasses.push('col-xs-push-' + this.props.extraSmallPush);
    }

    if (this.props.smallPush) {
      cssClasses.push('col-sm-push-' + this.props.smallPush);
    }

    if (this.props.mediumPush) {
      cssClasses.push('col-md-push-' + this.props.mediumPush);
    }

    if (this.props.largePush) {
      cssClasses.push('col-lg-push-' + this.props.largePush);
    }

    if (this.props.extraLargePush) {
      cssClasses.push('col-xl-push-' + this.props.extraLargePush);
    }

    if (this.props.extraSmallPull) {
      cssClasses.push('col-xs-pull-' + this.props.extraSmallPull);
    }

    if (this.props.smallPull) {
      cssClasses.push('col-sm-pull-' + this.props.smallPull);
    }

    if (this.props.mediumPull) {
      cssClasses.push('col-md-pull-' + this.props.mediumPull);
    }

    if (this.props.largePull) {
      cssClasses.push('col-lg-pull-' + this.props.largePull);
    }

    if (this.props.extraLargePull) {
      cssClasses.push('col-xl-pull-' + this.props.extraLargePull);
    }

    return cssClasses;
  }

  render() {
    return (
      <label
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(
          this.props,
          'className',
          'isHidden',
          'useControlStyle',
          'extraSmallSize',
          'smallSize',
          'mediumSize',
          'largeSize',
          'extraLargeSize',
          'extraSmallOffset',
          'smallOffset',
          'mediumOffset',
          'largeOffset',
          'extraLargeOffset',
          'extraSmallPush',
          'smallPush',
          'mediumPush',
          'largePush',
          'extraLargePush',
          'extraSmallPull',
          'smallPull',
          'mediumPull',
          'largePull',
          'extraLargePull'
        )}
      >
        {this.props.children}
      </label>
    );
  }
}

FormLabel.displayName = 'FormLabel';

FormLabel.propTypes = {
  className: React.PropTypes.string,
  isHidden: React.PropTypes.bool,
  extraSmallSize: React.PropTypes.number,
  smallSize: React.PropTypes.number,
  mediumSize: React.PropTypes.number,
  largeSize: React.PropTypes.number,
  extraLargeSize: React.PropTypes.number,
  extraSmallOffset: React.PropTypes.number,
  smallOffset: React.PropTypes.number,
  mediumOffset: React.PropTypes.number,
  largeOffset: React.PropTypes.number,
  extraLargeOffset: React.PropTypes.number,
  extraSmallPush: React.PropTypes.number,
  smallPush: React.PropTypes.number,
  mediumPush: React.PropTypes.number,
  largePush: React.PropTypes.number,
  extraLargePush: React.PropTypes.number,
  extraSmallPull: React.PropTypes.number,
  smallPull: React.PropTypes.number,
  mediumPull: React.PropTypes.number,
  largePull: React.PropTypes.number,
  extraLargePull: React.PropTypes.number
};

FormLabel.defaultProps = {
  className: null,
  isHidden: false,
  useControlStyle: false,
  extraSmallSize: null,
  smallSize: null,
  mediumSize: null,
  largeSize: null,
  extraLargeSize: null,
  extraSmallOffset: null,
  smallOffset: null,
  mediumOffset: null,
  largeOffset: null,
  extraLargeOffset: null,
  extraSmallPush: null,
  smallPush: null,
  mediumPush: null,
  largePush: null,
  extraLargePush: null,
  extraSmallPull: null,
  smallPull: null,
  mediumPull: null,
  largePull: null,
  extraLargePull: null
};

export default FormLabel;
