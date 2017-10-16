import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

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

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ExtendTextAutoCompleteOption.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

ExtendTextAutoCompleteOption.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool
};

ExtendTextAutoCompleteOption.defaultProps = {
  className: null,
  isActive: false
};

export default ExtendTextAutoCompleteOption;
