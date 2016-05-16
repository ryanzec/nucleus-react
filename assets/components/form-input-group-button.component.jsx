import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class FormInputGroupButton extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['input-group-btn'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isOpened) {
      cssClasses.push('open');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isOpened')}
      >
        {this.props.children}
      </div>
    );
  }
}

FormInputGroupButton.displayName = 'FormInputGroupButton';

FormInputGroupButton.propTypes = {
  className: React.PropTypes.string,
  isOpened: React.PropTypes.bool
};

FormInputGroupButton.defaultProps = {
  className: null,
  isOpened: false
};

export default FormInputGroupButton;
