import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import PopperJS from 'popper.js';
import {getPassThroughProperties} from 'src/utilities/component';
import {DomEventManager} from 'src/utilities/dom';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['popover__container'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createComponentDidMount = (instance) => {
  return () => {
    if (instance.props.onClickOutside) {
      instance.domEventManager.add(document, 'mousedown', instance.onClickOutside);
    }

    instance.updatePopper();
  };
};

export const createComponentWillMount = (instance) => {
  return () => {
    instance.domEventManager.clear();
  };
};

export const createOnClickOutside = (instance) => {
  return (event) => {
    let closePopover = true;

    if (
      (
        instance.refs.content
        && (
          ReactDOM.findDOMNode(instance.refs.content).contains(event.target)
          || ReactDOM.findDOMNode(instance.refs.content) === event.target
        )
      )
      || (
        instance.refs.handle
        && (
          ReactDOM.findDOMNode(instance.refs.handle).contains(event.target)
          || ReactDOM.findDOMNode(instance.refs.handle) === event.target
        )
      )
    ) {
      closePopover = false;
    }

    if (closePopover) {
      instance.props.onClickOutside();
    }
  };
};

export const createGetPopperStyles = (instance) => {
  return () => {
    if (!instance.props.isActive || !instance.popper || !instance.state.data) {
      return {
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        top: 0,
        left: 0
      };
    }

    return instance.state.data.styles;
  };
};

export const createGetPopperPlacement = (instance) => {
  return () => {
    if (instance.state.data && instance.state.data.placement) {
      return instance.state.data.placement;
    }

    return null;
  };
};

export const createOnUpdatePopperPosition = (instance) => {
  return (data) => {
    instance.setState({
      data
    });

    return data;
  }
};

export const createUpdatePopper = (instance) => {
  return () => {
    instance.destroyPopper();

    if (instance.refs.content && instance.refs.handle) {
      instance.createPopper();
    }
  };
};

export const createCreatePopper = (instance) => {
  return () => {
    const {
      placement
    } = instance.props;
    const modifiers = {
      applyStyle: {
        enabled: false
      },
      updateState: {
        enabled: true,
        order: 900,
        fn: instance.onUpdatePopperPosition
      },
      ...instance.props.modifiers
    };

    instance.popper = new PopperJS(
      ReactDOM.findDOMNode(instance.refs.handle),
      ReactDOM.findDOMNode(instance.refs.content), {
        placement,
        modifiers
      }
    );

    instance.popper.scheduleUpdate();
  };
};

export const createDestroyPopper = (instance) => {
  return () => {
    if (instance.popper) {
      instance.popper.destroy();
    }
  };
};

class PopoverContainer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
    onClickOutside: PropTypes.func,
    modifiers: PropTypes.object,
    placement: PropTypes.string
  };

  static defaultProps = {
    className: null,
    isActive: false,
    onClickOutside: null,
    modifiers: {},
    placement: 'auto'
  };

  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();
    this.popper = null;

    this.state = {};
  }

  componentDidMount = createComponentDidMount(this);
  componentWillUnmount = createComponentWillMount(this);
  onClickOutside = createOnClickOutside(this);
  onUpdatePopperPosition = createOnUpdatePopperPosition(this);
  getCssClasses = createGetCssClasses(this);
  getPopperStyles = createGetPopperStyles(this);
  getPopperPlacement = createGetPopperPlacement(this);
  updatePopper = createUpdatePopper(this);
  createPopper = createCreatePopper(this);
  destroyPopper = createDestroyPopper(this);

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

export default PopoverContainer;
