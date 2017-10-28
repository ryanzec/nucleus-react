import PropTypes from 'prop-types';
import React from 'react';
import iconData from 'font-awesome-svg-icons';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/svg-icon/SvgIcon.module.scss';

export const createGetInnerCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);

    // NOTE: the non-module class is intended to make icon more selectable in a global sense
    let cssClasses = [composedStyles.inner, `${instance.props.fragment}-icon`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(composedStyles[`${instance.props.styleType}Inner`]);
    }

    return cssClasses.join(' ');
  };
};

export const createGetOuterCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);

    // NOTE: the non-module class is intended to make icon more selectable in a global sense
    let cssClasses = [composedStyles.container, `${instance.props.fragment}-icon`];

    if (instance.props.outerClassName) {
      cssClasses = cssClasses.concat(instance.props.outerClassName.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetIndicatorHtml = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let indicator = '';

    if (instance.props.indicator) {
      const className = `${composedStyles.indicator} ${styles[`${instance.props.indicator}Indicator`]}`;

      indicator = `<div class="${className}"></div>`;
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

class SvgIcon extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    fragment: PropTypes.string,
    indicator: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    outerClassName: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
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
