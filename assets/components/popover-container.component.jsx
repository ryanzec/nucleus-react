import React from 'react';
import ReactDOM from 'react-dom';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomEventManager from '../utilities/dom/dom-event-manager';

import ReactTether from 'react-tether';

let count = 1;

class PopoverContainer extends React.Component {
  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();

    this.onClickOutside = this.onClickOutside.bind(this);
  }

  componentDidMount() {
    if (this.props.onClickOutside) {
      this.domEventManager.add(document, 'mousedown', this.onClickOutside);
    }
  }

  componentWillUnmount() {
    this.domEventManager.clear();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClickOutside() {
    let closePopover = true;

    if (this.refs.content && (ReactDOM.findDOMNode(this.refs.content).contains(event.target) || ReactDOM.findDOMNode(this.refs.content) === event.target)) {
      closePopover = false;
    }

    if (closePopover) {
      this.props.onClickOutside();
    }
  }

  getCssClasses() {
    let cssClasses = ['popover__container'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('tether-enabled');
    }

    return cssClasses;
  }

  render() {
    if (!this.props.isActive) {
      return this.props.children[0];
    }

    //NOTE: we need to add in a ref in order to make sure in the outside click handler we are not clicking on the content
    let children = React.Children.map(this.props.children, (child, key) => {
      return React.cloneElement(child, {
          ref: key === 0 ? 'handle' : 'content'
      });
    });

    return (
      <ReactTether
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        {children}
      </ReactTether>
    );
  }
}

PopoverContainer.displayName = 'PopoverContainer';

PopoverContainer.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  outClickOutside: React.PropTypes.func
};

PopoverContainer.defaultProps = {
  className: null,
  isActive: false,
  onClickOutside: null,

  //NOTE: default some ReactTether properties
  attachment: 'bottom center',
  constraints: [{
    to: 'scrollParent',
    attachment: 'together'
  }]
};

export default PopoverContainer;
