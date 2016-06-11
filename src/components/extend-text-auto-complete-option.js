import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ExtendTextAutoCompleteOption extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['extend-text__auto-complete-option'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isActive')}
      >
        {this.props.children}
      </div>
    );
  }
}

ExtendTextAutoCompleteOption.displayName = 'ExtendTextAutoCompleteOption';

ExtendTextAutoCompleteOption.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool
};

ExtendTextAutoCompleteOption.defaultProps = {
  className: null,
  isActive: false
};

export default ExtendTextAutoCompleteOption;
