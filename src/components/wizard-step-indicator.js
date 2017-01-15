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
      let mainClassName = 'wizard__step-indicator';
      let circleClassName = `${mainClassName}-circle`;
      let hrClassName = '';

      if (renderingNumber < this.props.currentStep) {
        circleClassName += ' is-previous';
        hrClassName = 'is-previous';
      } else if (renderingNumber === this.props.currentStep) {
        circleClassName += ' is-current';
      }

      stepNodes.push(
        <div
          className={mainClassName}
          key={`${renderingNumber}-indicator`}
        >
          <div className={circleClassName}></div>
          <span className={`${mainClassName}-title`}>{this.props.titles[renderingNumber - 1]}</span>
        </div>
      );

      if (renderingNumber < this.props.totalSteps) {
        stepNodes.push(
          <hr
            key={`${renderingNumber}-line`}
            className={hrClassName}
          />
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
        {...getPassThroughProperties(this.props, 'className', 'totalSteps', 'currentStep', 'titles')}
      >
        <div className="wizard__step-indicator-inner-container">
          {this.renderStepIndicators()}
        </div>
      </div>
    );
  }
}

WizardStepIndicator.propTypes = {
  className: React.PropTypes.string,
  totalSteps: React.PropTypes.number.isRequired,
  currentStep: React.PropTypes.number.isRequired,
  titles: React.PropTypes.array.isRequired,
};

WizardStepIndicator.defaultProps = {
  className: null,
};

export default WizardStepIndicator;
