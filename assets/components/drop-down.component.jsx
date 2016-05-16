import React from 'react';
import ReactDOM from 'react-dom';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomEventManager from '../utilities/dom/dom-event-manager';

class DropDown extends React.Component {
  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();
  }

  componentDidMount() {
    this.domEventManager.add(document, 'click', this.outsideClickHandler.bind(this));
  }

  componentWillUnmount() {
    this.domEventManager.clear();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['dropdown'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('open');
    }

    if (this.props.align === 'top') {
      cssClasses.push('dropup');
    }

    return cssClasses;
  }

  outsideClickHandler(event) {
    var containerNode = ReactDOM.findDOMNode(this);

    if (this.props.onClickOutside && !containerNode.contains(event.target)) {
      this.props.onClickOutside();
    }
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive', 'align')}
      >
        {this.props.children}
      </div>
    );
  }
}

DropDown.displayName = 'DropDown';

DropDown.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
  align: React.PropTypes.oneOf(['top', 'bottom']),
  onClickOutside: React.PropTypes.func
};

DropDown.defaultProps = {
  className: null,
  isActive: false,
  align: 'bottom',
  onClickOutside: null
};

export default DropDown;
