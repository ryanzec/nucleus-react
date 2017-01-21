import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class NotificationActions extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['notification__actions'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, NotificationActions.propTypes)}
      >
        {this.props.type === 'icons' ? this.renderIconActions() : this.renderTextActions()}
      </div>
    );
  }
}

NotificationActions.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(['icons', 'text']),
  actions: React.PropTypes.oneOf(['positive', 'negative', 'both']),
  onClickPositive: React.PropTypes.func,
  onClickNegative: React.PropTypes.func
};

NotificationActions.defaultProps = {
  className: null,
  type: 'icons',
  actions: 'negative',
  onClickPositive: null,
  onClickNegative: null
};

export default NotificationActions;
