import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

class FormLegend extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__legend'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.validation) {
      cssClasses.push(`m-${this.props.validation}`);
    }

    return cssClasses.join(' ');
  }

  render() {
    let requiredDetailsNode = null;

    if (this.props.displayRequiredDetails) {
      requiredDetailsNode = (
        <div className="form-required-details">
          <SvgIcon
            fragment="asterisk"
            className="form-element__required-icon"
          />required field
        </div>
      );
    }

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormLegend.propTypes)}
      >
        {this.props.children}{requiredDetailsNode}
      </div>
    );
  }
}

FormLegend.propTypes = {
  className: PropTypes.string,
  displayRequiredDetails: PropTypes.bool,
  validation: PropTypes.oneOf(['valid', 'inValid'])
};

FormLegend.defaultProps = {
  className: null,
  displayRequiredDetails: false,
  validation: null
};

export default FormLegend;
