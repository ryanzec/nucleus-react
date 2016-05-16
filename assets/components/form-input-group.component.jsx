import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormInputGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['input-group'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.size) {
      cssClasses.push('input-group-' + this.props.size);
    }

    if (this.props.position === 'vertical') {
      cssClasses.push('input-group-vertical');
      cssClasses.push('clearfix');
    }

    return cssClasses;
  }

  render() {
    return React.createElement(
      this.props.elementType,
      Object.assign({
        className: this.getCssClasses().join(' ')
      }, getPassThroughProperties(this.props, 'className', 'elementType', 'size', 'position')),
      this.props.children
    );
  }
}

FormInputGroup.displayName = 'FormInputGroup';

FormInputGroup.propTypes = {
  className: React.PropTypes.string,
  elementType: React.PropTypes.string,
  size: React.PropTypes.oneOf(['sm', 'lg']),
  position: React.PropTypes.oneOf(['horizontal', 'vertical'])
};

FormInputGroup.defaultProps = {
  className: null,
  elementType: 'div',
  size: null,
  position: 'horizontal'
};

export default FormInputGroup;
