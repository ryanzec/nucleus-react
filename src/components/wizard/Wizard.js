import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/wizard/Wizard.module.scss';

import Modal from 'src/components/modal/Modal';
import ModalHeader from 'src/components/modal/ModalHeader';
import ModalContent from 'src/components/modal/ModalContent';
import ModalFooter from 'src/components/modal/ModalFooter';
import Button from 'src/components/button/Button';
import Overlay from 'src/components/overlay/Overlay';
import WizardNavigation from './WizardNavigation';
import WizardContent from './WizardContent';
import WizardStepIndicator from './WizardStepIndicator';

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

export const createOnClickNextStep = (instance) => {
  return () => {
    if (instance.state.activeStep === instance.props.steps.length - 1) {
      if (instance.props.steps[instance.state.activeStep].nextHandler) {
        instance.props.steps[instance.state.activeStep].nextHandler(instance.props.closeHandler);
      } else {
        instance.props.closeHandler();
      }
    } else {
      if (instance.props.steps[instance.state.activeStep].nextHandler) {
        instance.props.steps[instance.state.activeStep].nextHandler(instance.increaseStep.bind(instance));
      } else {
        instance.increaseStep();
      }
    }
  };
};

export const createOnClickPreviousStep = (instance) => {
  return () => {
    if (instance.state.activeStep > 0) {
      if (instance.props.steps[instance.state.activeStep].previousHandler) {
        instance.props.steps[instance.state.activeStep].previousHandler(instance.decreaseStep.bind(instance));
      } else {
        instance.decreaseStep();
      }
    }
  };
};

export const createIncreaseStep = (instance) => {
  return ()  => {
    instance.setState({
      activeStep: instance.state.activeStep + 1
    });
  };
};

export const createDecreaseStep = (instance) => {
  return () => {
    instance.setState({
      activeStep: instance.state.activeStep - 1
    });
  };
};

export const createGetNextButtonText = (instance) => {
  return () => {
    let nextNodeText = 'Next';

    if (instance.state.activeStep === instance.props.steps.length - 1) {
      nextNodeText = 'Done';
    }

    return nextNodeText;
  };
};

export const createGetStepTitles = (instance) => {
  return () => {
    return instance.props.steps.map((step) => {
      return step.title || 'N/A';
    });
  };
};

export const createOnToggleCollapse = (instance) => {
  return () => {
    instance.setState({
      isCollapsed: !instance.state.isCollapsed,
    });
  };
};

class Wizard extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    steps: PropTypes.array.isRequired,
    isActive: PropTypes.bool,
    closeHandler: PropTypes.func.isRequired,
    allowExit: PropTypes.bool,
    allowGoingBackwards: PropTypes.bool,
    previousButtonText: PropTypes.string,
    nextButtonText: PropTypes.string,
    finishButtonText: PropTypes.string,
    initialStep: PropTypes.number,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    steps: null,
    isActive: false,
    closeHandler: null,
    allowExit: false,
    allowGoingBackwards: true,
    previousButtonText: 'Previous',
    nextButtonText: 'Next',
    finishButtonText: 'Done',
    initialStep: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      activeStep: props.initialStep || 0,
      isCollapsed: false,
    };

    if (process.env.ENV !== 'production') {
      if (!props.steps || props.steps.length === 0) {
        console.error('A wizard needs at least 1 step');
      }
    }
  }

  onToggleCollapse = createOnToggleCollapse(this);
  onClickNextStep = createOnClickNextStep(this);
  onClickPreviousStep = createOnClickPreviousStep(this);
  getCssClasses = createGetCssClasses(this);
  increaseStep = createIncreaseStep(this);
  decreaseStep = createDecreaseStep(this);
  getNextButtonText = createGetNextButtonText(this);
  getStepTitles = createGetStepTitles(this);

  renderModalContent() {
    return this.props.steps[this.state.activeStep].content;
  }

  renderModal() {
    const composedStyles = composeStyles(styles, this.props.customStyles);
    let previousStepButtonNode = null;

    if (this.props.allowGoingBackwards && this.state.activeStep > 0) {
      previousStepButtonNode = (
        <Button onClick={this.onClickPreviousStep}>{this.props.previousButtonText}</Button>
      );
    }

    let closeHandler = null;

    if (this.props.allowExit) {
      closeHandler = this.props.closeHandler;
    }

    const modalCustomStyles = {
      wrapper: composedStyles.modalContainer,
    };

    return (
      <Modal
        className={this.props.steps[this.state.activeStep].className}
        customStyles={modalCustomStyles}
        isActive={this.props.isActive}
        overlayDisabled
      >
        <WizardNavigation isCollapsed={this.state.isCollapsed} onToggleCollapse={this.onToggleCollapse}>
          <WizardStepIndicator
            titles={this.getStepTitles()}
            totalSteps={this.props.steps.length}
            currentStep={this.state.activeStep + 1}
            isCollapsed={this.state.isCollapsed}
          />
        </WizardNavigation>
        <WizardContent>
          <ModalHeader closeHandler={closeHandler}>
            Header
          </ModalHeader>
          <ModalContent>
            {this.renderModalContent()}
          </ModalContent>
          <ModalFooter>
            {previousStepButtonNode}
            <Button
              styleType="success"
              onClick={this.onClickNextStep}
            >
              {this.getNextButtonText()}
            </Button>
          </ModalFooter>
        </WizardContent>
      </Modal>
    );
  }

  renderStep() {
    if (this.props.steps[this.state.activeStep].type === 'modal') {
      return this.renderModal();
    }

    if (process.env.ENV !== 'production') {
      console.error('The wizard component currently only supports modal type wizards');
    }
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Wizard.propTypes)}
      >
        {this.renderStep()}
        <Overlay isActive={this.props.isActive} />
      </div>
    );
  }
}

export default Wizard;
