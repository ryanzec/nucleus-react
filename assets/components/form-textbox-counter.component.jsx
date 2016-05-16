import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormTextbox from './form-textbox.component.jsx';
import FormInputGroup from './form-input-group.component.jsx';
import FormInputGroupAddon from './form-input-group-addon.component.jsx';

class FormTextboxCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-textbox-counter'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  getCounterCssClasses() {
    let cssClasses = ['form-textbox-counter__counter'];

     if (this.props.value && this.props.value.length > this.props.maxLimit) {
      cssClasses.push('text-danger');
    } else if (this.props.value && this.props.value.length >= this.props.warningLimit) {
      cssClasses.push('text-warning');
    } else {
      cssClasses.push('text-muted');
    }

    return cssClasses;
  }

  getCounterDifference() {
    let difference = this.props.maxLimit;

    if (this.props.value) {
      difference -= this.props.value.length;
    }

    return difference;
  }

  render() {
    let charactersLeft = this.getCounterDifference();
    let text;

    if (charactersLeft >= 0) {
      text = window.i18n['components/form'].textboxCounterLeftCount({
        CHARACTERS_LEFT: charactersLeft
      });
    } else {
      text = window.i18n['components/form'].textboxCounterOverCount({
        CHARACTERS_OVER: charactersLeft * -1
      });
    }

    return (
      <FormInputGroup position="vertical">
        <FormTextbox
          className={this.props.textboxClassName}
          {...getPassThroughProperties(this.props, 'className', 'textboxClassName', 'align', 'warningLimit', 'maxLimit')}
        />
        <FormInputGroupAddon>
          <span className={this.getCounterCssClasses().join(' ')}>{text}</span>
        </FormInputGroupAddon>
      </FormInputGroup>
    );
  }
}

FormTextboxCounter.displayName = 'FormTextboxCounter';

FormTextboxCounter.propTypes = {
  className: React.PropTypes.string,
  textboxClassName: React.PropTypes.string,
  align: React.PropTypes.oneOf(['left', 'right']),
  warningLimit: React.PropTypes.number,
  maxLimit: React.PropTypes.number
};

FormTextboxCounter.defaultProps = {
  className: null,
  textboxClassName: null,
  align: 'left',
  warningLimit: 0,
  maxLimit: 0
};

export default FormTextboxCounter;
