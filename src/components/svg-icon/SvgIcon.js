import PropTypes from 'prop-types';
import React from 'react';
import iconData from 'font-awesome-svg-icons';
import {getPassThroughProperties} from 'src/utilities/component';

import styles from 'src/components/svg-icon/SvgIcon.module.scss';

export const composeStyles = (baseStyles, overrideStyles, composeStyle = 'merge') => {
  if (!overrideStyles) {
    return baseStyles;
  }

  const composedStyles = {};
  const keys = Object.keys(baseStyles);

  for (let x = 0; x < keys.length; x += 1) {
    let newValue = baseStyles[keys[x]];

    if (overrideStyles[keys[x]]) {
      if (composeStyle === 'overwrite') {
        newValue = overrideStyles[keys[x]];
      } else {
        newValue += ` ${overrideStyles[keys[x]]}`;
      }
    }

    composedStyles[keys[x]] = newValue;
  }

  return composedStyles;
}

export const createGetInnerCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.overrideStyles);

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
    const composedStyles = composeStyles(styles, instance.props.overrideStyles);

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
    const composedStyles = composeStyles(styles, instance.props.overrideStyles);

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

class SvgIcon extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    fragment: PropTypes.string,
    indicator: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
    outerClassName: PropTypes.string,
    size: PropTypes.string,
    overrideStyles: PropTypes.object,
  };

  static defaultProps = {
    className: null,
    styleType: null,
    fragment: null,
    indicator: null,
    outerClassName: null,
    size: null,
    overrideStyles: null,
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
