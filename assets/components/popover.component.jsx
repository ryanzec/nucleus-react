import React from 'react';
import ReactDOM from 'react-dom';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomEventManager from '../utilities/dom/dom-event-manager';

import TetherComponent from 'react-tether';

//NOTE: this might seem backward but it is becuase the position on related to the floating content, not the target
const attachmentPositionMap = {
  top: 'bottom center',
  bottom: 'top center',
  left: 'middle right',
  right: 'middle left'
}

class Popover extends React.Component {
  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();

    this.outsideClickHandler = this.outsideClickHandler.bind(this);
  }

  componentDidMount() {
    this.domEventManager.add(document, 'mousedown', this.outsideClickHandler);
  }

  componentWillUnmount() {
    this.domEventManager.clear();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['popover'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split('className', 'isActive'));
    }

    return cssClasses;
  }

  outsideClickHandler(event) {
    var closePopover = true;

    if (document.querySelector('.bs-tether-target') && document.querySelector('.bs-tether-target').contains(event.target)) {
      closePopover = false;
    }

    if (document.querySelector('.bs-tether-element') && document.querySelector('.bs-tether-element').contains(event.target)) {
      closePopover = false;
    }

    if (closePopover) {
      console.log('cose popover')
      this.props.onClickOutside();
    }
  }

  render() {
    if (!this.props.isActive) {
      return (
        this.props.children[0]
      );
    }

    return (
      <TetherComponent
        ref="tetherComponent"
        className={this.getCssClasses().join(' ')}
        attachment={attachmentPositionMap[this.props.attachment]}
        classPrefix="bs-tether"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        {this.props.children}
      </TetherComponent>
    );
  }
}

Popover.displayName = 'Popover';

Popover.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  attachment: React.PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  onClickOutside: React.PropTypes.func
};

Popover.defaultProps = {
  className: null,
  isActive: false,
  attachment: 'top',
  onClickOutside: null
};

export default Popover;
