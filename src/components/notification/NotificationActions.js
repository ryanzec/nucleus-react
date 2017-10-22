import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['notification__actions'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class NotificationActions extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['icons', 'text']),
    actions: PropTypes.oneOf(['positive', 'negative', 'both']),
    onClickPositive: PropTypes.func,
    onClickNegative: PropTypes.func
  };

  static defaultProps = {
    className: null,
    type: 'icons',
    actions: 'negative',
    onClickPositive: null,
    onClickNegative: null
  };

  getCssClasses = createGetCssClasses(this);

  renderTextActions() {
    let nodes;
    const positiveNode = (
      <span key="0" className="notification__actions-action" onClick={this.props.onClickPositive}>Accept</span>
    );
    const negativeNode = (
      <span key="1" className="notification__actions-action" onClick={this.props.onClickNegative}>Decline</span>
    );
    const dividerNode = (
      <span key="2" className="notification__actions-divider">|</span>
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
    let nodes;
    const positiveNode = (
      <SvgIcon key="0" fragment="check" className="notification__actions-action" onClick={this.props.onClickPositive} />
    );
    const negativeNode = (
      <SvgIcon key="1" fragment="times" className="notification__actions-action" onClick={this.props.onClickNegative} />
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
