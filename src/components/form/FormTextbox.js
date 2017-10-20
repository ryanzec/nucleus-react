import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [instance.props.type === 'textarea' || instance.props.type === 'file' ? `form-element__${instance.props.type}` : 'form-element__textbox'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class FormTextbox extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.string
  };

  static defaultProps = {
    className: null,
    type: 'text'
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    if (this.props.type === 'textarea') {
      return (
        <textarea
          className={this.getCssClasses()}
          {...getPassThroughProperties(this.props, FormTextbox.propTypes)}
        />
      );
    }

    return (
      <input
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormTextbox.propTypes, 'type')}
      />
    );
  }
}

export default FormTextbox;
