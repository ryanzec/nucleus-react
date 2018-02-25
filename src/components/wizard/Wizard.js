import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

import Modal from 'src/components/modal/Modal';
import ModalHeader from 'src/components/modal/ModalHeader';
import ModalContent from 'src/components/modal/ModalContent';
import ModalFooter from 'src/components/modal/ModalFooter';
import Button from 'src/components/button/Button';
import Overlay from 'src/components/overlay/Overlay';
import WizardNavigation from './WizardNavigation';
import WizardContent from './WizardContent';
import WizardStepIndicator from './WizardStepIndicator';

class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: props.initialStep || 0
    };

    if (process.env.ENV !== 'production') {
      if (!props.steps || props.steps.length === 0) {
        console.error('A wizard needs at least 1 step');
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClickNextStep = () => {
    if (this.state.activeStep === this.props.steps.length - 1) {
      if (this.props.steps[this.state.activeStep].nextHandler) {
        this.props.steps[this.state.activeStep].nextHandler(this.props.closeHandler);
      } else {
        this.props.closeHandler();
      }
    } else {
      if (this.props.steps[this.state.activeStep].nextHandler) {
        this.props.steps[this.state.activeStep].nextHandler(this.increaseStep.bind(this));
      } else {
        this.increaseStep();
      }
    }
  };

  onClickPreviousStep = () => {
    if (this.state.activeStep > 0) {
      if (this.props.steps[this.state.activeStep].previousHandler) {
        this.props.steps[this.state.activeStep].previousHandler(this.decreaseStep.bind(this));
      } else {
        this.decreaseStep();
      }
    }
  };

  getCssClasses() {
    let cssClasses = ['wizard'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  increaseStep() {
    this.setState({
      activeStep: this.state.activeStep + 1
    });
  }

  decreaseStep() {
    this.setState({
      activeStep: this.state.activeStep - 1
    });
  }

  getNextButtonText() {
    let nextNodeText = 'Next';

    if (this.state.activeStep === this.props.steps.length - 1) {
      nextNodeText = 'Done';
    }

    return nextNodeText;
  }

  getStepTitles() {
    return this.props.steps.map((step) => {
      return step.title || 'N/A';
    });
  }

  renderModalContent() {
    return this.props.steps[this.state.activeStep].content;
  }

  renderModal() {
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

    return (
      <Modal
        className={`m-wizard ${this.props.steps[this.state.activeStep].className}`}
        isActive={this.props.isActive}
        overlayDisabled
      >
        <WizardNavigation>
          <WizardStepIndicator
            titles={this.getStepTitles()}
            totalSteps={this.props.steps.length}
            currentStep={this.state.activeStep + 1}
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

Wizard.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array.isRequired,
  isActive: PropTypes.bool,
  closeHandler: PropTypes.func.isRequired,
  allowExit: PropTypes.bool,
  allowGoingBackwards: PropTypes.bool,
  previousButtonText: PropTypes.string,
  nextButtonText: PropTypes.string,
  finishButtonText: PropTypes.string,
  initialStep: PropTypes.number
};

Wizard.defaultProps = {
  className: null,
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

export default Wizard;
