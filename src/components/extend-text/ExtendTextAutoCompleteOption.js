import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['extend-text__auto-complete-option'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  };
}

class ExtendTextAutoCompleteOption extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    isActive: false
  };

  getCssClasses = createGetCssClasses(this);

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

export default ExtendTextAutoCompleteOption;
