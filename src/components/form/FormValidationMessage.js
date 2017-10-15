import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

import SvgIcon from '../svg-icon/SvgIcon';

class FormValidationMessage extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__validation-message'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    let iconNode = null;

    if (this.props.iconFragment) {
      iconNode = (
        <SvgIcon
          className="form-element__validation-icon"
          fragment={this.props.iconFragment}
        />
      );
    }


    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormValidationMessage.propTypes)}
      >
        {iconNode}{this.props.children}
      </div>
    );
  }
}

FormValidationMessage.propTypes = {
  className: PropTypes.string,
  iconFragment: PropTypes.string
};

FormValidationMessage.defaultProps = {
  className: null,
  iconFragment: null
};

export default FormValidationMessage;
