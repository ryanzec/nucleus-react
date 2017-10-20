import PropTypes from 'prop-types';
import React from 'react';
import iconData from 'font-awesome-svg-icons';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetInnerCssClasses = (instance) => {
  return () => {
    let cssClasses = ['svg-icon__container', `${instance.props.fragment}-icon`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    return cssClasses.join(' ');
  };
};

export const createGetOuterCssClasses = (instance) => {
  return () => {
    let cssClasses = ['svg-icon__outer-container', `${instance.props.fragment}-icon`];

    if (instance.props.outerClassName) {
      cssClasses = cssClasses.concat(instance.props.outerClassName.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetIndicatorHtml = (instance) => {
  return () => {
    let indicator = '';

    if (instance.props.indicator) {
      indicator = `<div class="svg-icon__indicator m-${instance.props.indicator}"></div>`;
    }

    return indicator;
  };
};

export const createGetSvgHtml = (instance) => {
  return () => {
    if (instance.props.size) {
      return iconData[instance.props.size][instance.props.fragment];
    }

    return iconData[instance.props.fragment];
  };
};

class SvgIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    fragment: PropTypes.string,
    indicator: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    outerClassName: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    styleType: null,
    fragment: null,
    indicator: null,
    outerClassName: null,
    size: null,
  };

  getInnerCssClasses = createGetInnerCssClasses(this);
  getOuterCssClasses = createGetOuterCssClasses(this);
  getIndicatorHtml = createGetIndicatorHtml(this);
  getSvgHtml = createGetSvgHtml(this);

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
        />
      </span>
    );
  }
}

export default SvgIcon;
