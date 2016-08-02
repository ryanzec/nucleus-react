import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class WizardStepIndicator extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['wizard__step-indicator-container'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  renderStepIndicators() {
    let stepNodes = [];
    let renderingNumber = 1;

    while (renderingNumber <= this.props.totalSteps) {
      let circleClassName = 'wizard__step-indicator';
      let hrClassName = '';

      if (renderingNumber < this.props.currentStep) {
        circleClassName += ' is-previous';
        hrClassName = 'is-previous';
      } else if (renderingNumber === this.props.currentStep) {
        circleClassName += ' is-current';
      }

      stepNodes.push(
        <div className={circleClassName}></div>
      );

      if (renderingNumber < this.props.totalSteps) {
        stepNodes.push(
          <hr className={hrClassName} />
        );
      }

      renderingNumber += 1;
    }

    return stepNodes;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        <div className="wizard__step-indicator-inner-container">
          {this.renderStepIndicators()}
        </div>
      </div>
    );
  }
}

WizardStepIndicator.displayName = 'WizardStepIndicator';

WizardStepIndicator.propTypes = {
  className: React.PropTypes.string,
  totalSteps: React.PropTypes.number.isRequired,
  currentStep: React.PropTypes.number.isRequired
};

WizardStepIndicator.defaultProps = {
  className: null,
  totalSteps: 1,
  currentStep: 1
};

export default WizardStepIndicator;
