import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['form-element'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.validation) {
      cssClasses.push(`m-${instance.props.validation}`);
    }

    return cssClasses.join(' ');
  };
}

class FormElement extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    validation: PropTypes.oneOf([false, 'valid', 'invalid'])
  };

  static defaultProps = {
    className: null,
    validation: false
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormElement.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default FormElement;
