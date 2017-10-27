import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/notification/NotificationActions.module.scss';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container, composedStyles[instance.props.styleType]];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createGetSvgIconCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.action, composedStyles[`${instance.props.styleType}SvgIcon`]];

    if (instance.props.isFilled) {
      cssClasses.push(composedStyles.isFilledSvgIcon);
    }

    return cssClasses.join(' ');
  };
};

class NotificationActions extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    type: PropTypes.oneOf(['icons', 'text']),
    actions: PropTypes.oneOf(['positive', 'negative', 'both']),
    onClickPositive: PropTypes.func,
    onClickNegative: PropTypes.func,
    isFilled: PropTypes.bool,
    styleType: PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  };

  static defaultProps = {
    className: null,
    type: 'icons',
    actions: 'negative',
    onClickPositive: null,
    onClickNegative: null,
    customStyles: null,
    isFilled: false,
    styleType: 'info',
  };

  getCssClasses = createGetCssClasses(this);
  getSvgIconCssClasses = createGetSvgIconCssClasses(this);

  renderTextActions() {
    const composedStyles = composeStyles(styles, this.props.customStyles);
    let nodes;
    const positiveNode = (
      <span key="0" className={composedStyles.action} onClick={this.props.onClickPositive}>Accept</span>
    );
    const negativeNode = (
      <span key="1" className={composedStyles.action} onClick={this.props.onClickNegative}>Decline</span>
    );
    const dividerNode = (
      <span key="2" className={composedStyles.divider}>|</span>
    );

    if (this.props.actions === 'negative') {
      nodes = [negativeNode];
    } else if (this.props.actions === 'positive') {
      nodes = [positiveNode];
    } else {
      nodes = [negativeNode, dividerNode, positiveNode];
    }

    return nodes;
  }

  renderIconActions() {
    console.log(this.getSvgIconCssClasses());
    let nodes;
    const positiveNode = (
      <SvgIcon key="0" fragment="check" className={this.getSvgIconCssClasses()} onClick={this.props.onClickPositive} />
    );
    const negativeNode = (
      <SvgIcon key="1" fragment="times" className={this.getSvgIconCssClasses()} onClick={this.props.onClickNegative} />
    );

    if (this.props.actions === 'negative') {
      nodes = [negativeNode];
    } else if (this.props.actions === 'positive') {
      nodes = [positiveNode];
    } else {
      nodes = [negativeNode, positiveNode];
    }

    return nodes;
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, NotificationActions.propTypes)}
      >
        {this.props.type === 'icons' ? this.renderIconActions() : this.renderTextActions()}
      </div>
    );
  }
}

export default NotificationActions;
