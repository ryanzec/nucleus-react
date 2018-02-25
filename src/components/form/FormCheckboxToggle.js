import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class FormCheckboxToggle extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__checkbox-toggle'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.checked) {
      cssClasses.push('is-checked');
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormCheckboxToggle.propTypes)}
      >
        <div className="form-element__checkbox-toggle-circle"></div>
        <div className="form-element__checkbox-toggle-bar">
          <span>{this.props.checked ? this.props.onNode : this.props.offNode}</span>
        </div>
      </div>
    );
  }
}

FormCheckboxToggle.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
  offNode: PropTypes.node,
  onNode: PropTypes.node
};

FormCheckboxToggle.defaultProps = {
  className: null,
  checked: false,
  offNode: 'Off',
  onNode: 'On'
};

export default FormCheckboxToggle;
