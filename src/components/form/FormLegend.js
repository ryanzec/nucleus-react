import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['form-element__legend'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.validation) {
      cssClasses.push(`m-${instance.props.validation}`);
    }

    return cssClasses.join(' ');
  };
}

class FormLegend extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    displayRequiredDetails: PropTypes.bool,
    validation: PropTypes.oneOf(['valid', 'inValid'])
  };

  static defaultProps = {
    className: null,
    displayRequiredDetails: false,
    validation: null
  };

  getCssClasses = createGetCssClasses(this);

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

export default FormLegend;
