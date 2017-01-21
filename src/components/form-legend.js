import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

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

    return cssClasses;
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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, FormLegend.propTypes)}
      >
        {this.props.children}{requiredDetailsNode}
      </div>
    );
  }
}

FormLegend.propTypes = {
  className: React.PropTypes.string,
  displayRequiredDetails: React.PropTypes.bool,
  validation: React.PropTypes.oneOf(['valid', 'inValid'])
};

FormLegend.defaultProps = {
  className: null,
  displayRequiredDetails: false,
  validation: null
};

export default FormLegend;
