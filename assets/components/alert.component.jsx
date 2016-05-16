import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import Button from './button.component.jsx';

class Alert extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['alert'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push('alert-' + this.props.styleType);
    }

    return cssClasses;
  }

  renderCloseButton() {
    let node = null;

    if (this.props.isDismissable) {
      node = (
        <Button className="close" onClick={this.props.onClickClose}>
          <span aria-hidden="true">&times;</span>
        </Button>
      );
    }

    return node;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType', 'isDismissable', 'onClickClose')}
      >
        {this.renderCloseButton()}
        {this.props.children}
      </div>
    );
  }
}

Alert.displayName = 'Alert';

Alert.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger']),
  isDismissable: React.PropTypes.bool,
  onClickClose: React.PropTypes.func
};

Alert.defaultProps = {
  className: null,
  styleType: 'success',
  isDismissable: false,
  onClickClose: null
};

export default Alert;
