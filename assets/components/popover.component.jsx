import React from 'react';
import ReactDOM from 'react-dom';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import AppendBodyComponent from './append-body-component.component.jsx';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomEventManager from '../utilities/dom/dom-event-manager';

import PopoverToggle from './popover-toggle.component.jsx';
import PopoverContentWrapper from './popover-content-wrapper.component.jsx';

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

    this.processOutsideClick = true;
    this.domEventManager = new DomEventManager();

    this.outsideClickHandler = this.outsideClickHandler.bind(this);
    this.onClickContentWrapper = this.onClickContentWrapper.bind(this);
  }

  componentDidMount() {
    this.domEventManager.add(document, 'click', this.outsideClickHandler);
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
    if (this.processOutsideClick && this.props.onClickOutside) {
      this.props.onClickOutside();
    }

    this.processOutsideClick = true;
  }

  onClickContentWrapper() {
    this.processOutsideClick = false;
  }

  render() {
    //NOTE: it seems like by using tether, it breaks the ability to do basic Node.contains() checking in outsideClickHandler so I have to re-create the
    //NOTE: toggle and content wrapper components with special functionality to be able to properly track outside clicks
    let toggleNode = (
      <PopoverToggle
        onClick={this.onClickContentWrapper}
        {...getPassThroughProperties(this.props.children[0].props)}
      >
        {this.props.children[0].props.children}
      </PopoverToggle>
    );

    if (!this.props.isActive) {
      return toggleNode;
    }

    let children = [toggleNode];

    if (this.props.children[1]) {
      children.push(
        <PopoverContentWrapper
          onClick={this.onClickContentWrapper}
        >
          {this.props.children[1].props.children}
        </PopoverContentWrapper>
      );
    }

    return (
      <TetherComponent
        className={this.getCssClasses().join(' ')}
        attachment={attachmentPositionMap[this.props.attachment]}
        classPrefix="bs-tether"
        constraints={[{
          to: 'scrollParent',
          attachment: 'together'
        }]}
      >
        {children}
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
