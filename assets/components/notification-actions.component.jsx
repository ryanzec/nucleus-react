import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon.component.jsx';

class NotificationActions extends React.Component {
  constructor(props) {
    super(props);
  }

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
    let nodes = [];
    let positiveNode = (
      <span key="0" className="notification__actions-action">Accept</span>
    );
    let negativeNode = (
      <span key="1" className="notification__actions-action">Decline</span>
    );
    let dividerNode = (
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
    let nodes = [];
    let positiveNode = (
      <SvgIcon key="0" fragment="check" className="notification__actions-action" />
    );
    let negativeNode = (
      <SvgIcon key="1" fragment="times" className="notification__actions-action" />
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
    var actionNodes = this.props.type === 'icons' ? this.renderIconActions() : this.renderTextActions();

    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'type', 'actions')}
      >
        {actionNodes}
      </div>
    );
  }
}

NotificationActions.displayName = 'NotificationActions';

NotificationActions.propTypes = {
  className: React.PropTypes.string,
  type: customPropTypes.notificationActionsTypes,
  actions: customPropTypes.notificationActionsActions
};

NotificationActions.defaultProps = {
  className: null,
  text: 'icons',
  actions: 'negative'
};

export default NotificationActions;
