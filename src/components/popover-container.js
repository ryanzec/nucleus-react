import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';

import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate
} from '../utilities/component';
import {
  DomEventManager
} from '../utilities/dom';

class PopoverContainer extends React.Component {
  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();
    this.popper = null;

    this.state = {};
  }

  componentDidMount() {
    if (this.props.onClickOutside) {
      this.domEventManager.add(document, 'mousedown', this.onClickOutside);
    }

    this.updatePopper();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentWillUnmount() {
    this.domEventManager.clear();
  }

  onClickOutside = event => {
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
  };

  getCssClasses() {
    let cssClasses = ['popover__container'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  getPopperStyles() {
    if (!this.props.isActive || !this.popper || !this.state.data) {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        top: 0,
        left: 0
      };
    }

    return this.state.data.styles;
  }

  getPopperPlacement() {
    if (this.state.data && this.state.data.placement) {
      return this.state.data.placement;
    }

    return null;
  }

  updatePopperPosition = (data) => {
    this.setState({
      data
    });

    return data;
  }

  updatePopper() {
    this.destroyPopper();

    if (this.refs.content && this.refs.handle) {
      this.createPopper();
    }
  }

  createPopper() {
    const {
      placement
    } = this.props;
    const modifiers = {
      applyStyle: {
        enabled: false
      },
      updateState: {
        enabled: true,
        order: 900,
        fn: this.updatePopperPosition
      },
      ...this.props.modifiers
    };

    this.popper = new PopperJS(
      ReactDOM.findDOMNode(this.refs.handle),
      ReactDOM.findDOMNode(this.refs.content), {
        placement,
        modifiers
      }
    );

    this.popper.scheduleUpdate();
  }

  destroyPopper() {
    if (this.popper) {
      this.popper.destroy();
    }
  }

  render() {
    //NOTE: we need to add in a ref in order to make sure in the outside click handler we are not clicking on the content
    let children = React.Children.map(this.props.children, (child, key) => {
      let attributes = {
        ref: key === 0 ? 'handle' : 'content'
      };

      if (key === 1) {
        attributes = {
          ...attributes,
          style: {
            ...this.getPopperStyles()
          },
          'data-placement': this.getPopperPlacement()
        };
      }

      return React.cloneElement(child, attributes);
    });

    return (
      <span
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, PopoverContainer.propTypes)}
      >
        {children}
      </span>
    );
  }
}

PopoverContainer.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClickOutside: PropTypes.func,
  modifiers: PropTypes.object,
  placement: PropTypes.string
};

PopoverContainer.defaultProps = {
  className: null,
  isActive: false,
  onClickOutside: null,

  //NOTE: default some ReactTether properties
  modifiers: {},
  placement: 'auto'
};

export default PopoverContainer;
