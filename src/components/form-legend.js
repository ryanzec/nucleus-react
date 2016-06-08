import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

class FormLegend extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__legend'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.validation) {
      cssClasses.push('m-' + this.props.validation);
    }

    return cssClasses;
  }

  render() {
    var requiredDetailsNode = null;

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
        {...getPassThroughProperties(this.props, 'className', 'displayRequiredDetails')}
      >
        {this.props.children}{requiredDetailsNode}
      </div>
    );
  }
}

FormLegend.displayName = 'FormLegend';

FormLegend.propTypes = {
  className: React.PropTypes.string,
  displayRequiredDetails: React.PropTypes.bool
};

FormLegend.defaultProps = {
  className: null,
  displayRequiredDetails: false
};

export default FormLegend;
