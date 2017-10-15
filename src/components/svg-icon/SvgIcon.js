import PropTypes from 'prop-types';
import React from 'react';
import iconData from 'font-awesome-svg-icons';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

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

    return cssClasses.join(' ');
  }

  getOuterCssClasses() {
    let cssClasses = ['svg-icon__outer-container', `${this.props.fragment}-icon`];

    if (this.props.outerClassName) {
      cssClasses = cssClasses.concat(this.props.outerClassName.split(' '));
    }

    return cssClasses.join(' ');
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
        className={this.getOuterCssClasses()}
        {...getPassThroughProperties(this.props, SvgIcon.propTypes)}
      >
        <span
          className={this.getInnerCssClasses()}
          dangerouslySetInnerHTML={{
            __html: this.getSvgHtml() + this.getIndicatorHtml()
          }}
        ></span>
      </span>
    );
  }
}

SvgIcon.propTypes = {
  className: PropTypes.string,
  styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  fragment: PropTypes.string,
  indicator: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  outerClassName: PropTypes.string,
  size: PropTypes.string
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
