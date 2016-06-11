import React from 'react';
import iconData from 'nucleus-icons';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';

class SvgIcon extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getInnerCssClasses() {
    let cssClasses = ['svg-icon__container', `${this.props.fragment}-icon`];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    return cssClasses;
  }

  getOuterCssClasses() {
    let cssClasses = ['svg-icon__outer-container', `${this.props.fragment}-icon`];

    if (this.props.outerClassName) {
      cssClasses = cssClasses.concat(this.props.outerClassName.split(' '));
    }

    return cssClasses;
  }

  getIndicatorHtml() {
    let indicator = '';

    if (this.props.indicator) {
      indicator = `<div class="svg-icon__indicator m-${this.props.indicator}"></div>`;
    }

    return indicator;
  }

  getSvgHtml() {
    if (this.props.size) {
      return iconData[this.props.size][this.props.fragment];
    }

    return iconData[this.props.fragment];
  }

  render() {
    return (
      <span
        className={this.getOuterCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'fragment', 'indicator', 'outerClassName', 'size', 'styleType')}
      >
        <span
          className={this.getInnerCssClasses().join(' ')}
          dangerouslySetInnerHTML={{
            __html: this.getSvgHtml() + this.getIndicatorHtml()
          }}
        ></span>
      </span>
    );
  }
}

SvgIcon.displayName = 'SvgIcon';

SvgIcon.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  fragment: React.PropTypes.string,
  indicator: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  outerClassName: React.PropTypes.string,
  size: React.PropTypes.string
};

SvgIcon.defaultProps = {
  className: null,
  styleType: null,
  fragment: null,
  indicator: null,
  outerClassName: null,
  size: null
};

export default SvgIcon;
