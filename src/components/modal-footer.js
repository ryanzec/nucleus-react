import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ModalFooter extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['modal__footer'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActions) {
      cssClasses.push('is-actions');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActions')}
      >
        {this.props.children}
      </div>
    );
  }
}

ModalFooter.displayName = 'ModalFooter';

ModalFooter.propTypes = {
  className: React.PropTypes.string,
  isActions: React.PropTypes.bool
};

ModalFooter.defaultProps = {
  className: null,
  isActions: false
};

export default ModalFooter;
