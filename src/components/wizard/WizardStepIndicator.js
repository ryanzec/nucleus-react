import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/wizard/WizardStepIndicator.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

class WizardStepIndicator extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    totalSteps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    titles: PropTypes.array.isRequired,
    isCollapsed: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    isCollapsed: false,
  };

  getCssClasses = createGetCssClasses(this);

  renderStepIndicators() {
    const composedStyles = composeStyles(styles, this.props.customStyles);
    let stepNodes = [];
    let renderingNumber = 1;

    while (renderingNumber <= this.props.totalSteps) {

      let mainClassName = composedStyles.indicator;
      let circleClassName = composedStyles.indicatorCircle;
      let hrClassName = composedStyles.indicatorLine;
      let titleClassName = composedStyles.indicatorTitle;

      if (renderingNumber < this.props.currentStep) {
        circleClassName += ` ${composedStyles.indicatorCircleIsPrevious}`;
        hrClassName += ` ${composedStyles.indicatorLineIsPrevious}`;
      } else if (renderingNumber === this.props.currentStep) {
        circleClassName += ` ${composedStyles.indicatorCircleIsCurrent}`;
      }

      if (this.props.isCollapsed) {
        titleClassName += ` ${composedStyles.indicatorTitleIsCollapsed}`;
      }

      stepNodes.push(
        <div
          className={mainClassName}
          key={`${renderingNumber}-indicator`}
        >
          <div className={circleClassName}></div>
          <span className={titleClassName}>{this.props.titles[renderingNumber - 1]}</span>
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
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, WizardStepIndicator.propTypes)}
      >
        <div>
          {this.renderStepIndicators()}
        </div>
      </div>
    );
  }
}

export default WizardStepIndicator;
