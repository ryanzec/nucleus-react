import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

class FormSelect extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__select'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <select
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FormSelect.propTypes)}
      >
        {this.props.children}
      </select>
    );
  }
}

FormSelect.propTypes = {
  className: PropTypes.string
};

FormSelect.defaultProps = {
  className: null
};

export default FormSelect;
