import React from 'react';
import ReactDOM from 'react-dom';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';
import { DomEventManager } from '../utilities/dom';

import ReactTether from 'react-tether';

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

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentWillUnmount() {
    this.domEventManager.clear();
  }

  onClickOutside(event) {
    let closePopover = true;

    if (
      (
        this.refs.content
        && (
          ReactDOM.findDOMNode(this.refs.content).contains(event.target)
          || ReactDOM.findDOMNode(this.refs.content) === event.target
        )
      )
      || (
        this.refs.handle
        && (
          ReactDOM.findDOMNode(this.refs.handle).contains(event.target)
          || ReactDOM.findDOMNode(this.refs.handle) === event.target
        )
      )
    ) {
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

    return cssClasses.join(' ');
  }

  render() {
    //NOTE: we need to add in a ref in order to make sure in the outside click handler we are not clicking on the content
    let children = React.Children.map(this.props.children, (child, key) => {
      return React.cloneElement(child, {
        ref: key === 0 ? 'handle' : 'content'
      });
    }).filter((item, key) => {
      return this.props.isActive || key === 0;
      // return true;
    });

    return (
      <ReactTether
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, PopoverContainer.propTypes)}
      >
        {children}
      </ReactTether>
    );
  }
}

PopoverContainer.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  onClickOutside: React.PropTypes.func
};

PopoverContainer.defaultProps = {
  className: null,
  isActive: false,
  onClickOutside: null,

  //NOTE: default some ReactTether properties
  attachment: 'bottom center',
  constraints: [{
    to: 'window',
    attachment: 'together'
  }]
};

export default PopoverContainer;
