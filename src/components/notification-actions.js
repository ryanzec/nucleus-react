import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

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

    return cssClasses.join(' ');
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
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, NotificationActions.propTypes)}
      >
        {this.props.type === 'icons' ? this.renderIconActions() : this.renderTextActions()}
      </div>
    );
  }
}

NotificationActions.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['icons', 'text']),
  actions: PropTypes.oneOf(['positive', 'negative', 'both']),
  onClickPositive: PropTypes.func,
  onClickNegative: PropTypes.func
};

NotificationActions.defaultProps = {
  className: null,
  type: 'icons',
  actions: 'negative',
  onClickPositive: null,
  onClickNegative: null
};

export default NotificationActions;
