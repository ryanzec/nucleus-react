import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import Modal from './modal';
import ModalHeader from './modal-header';
import ModalContent from './modal-content';
import ModalFooter from './modal-footer';
import Button from './button';
import Overlay from './overlay';
import WizardHighlightElement from './wizard-highlight-element';

class Wizard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: this.props.initialStep || 0
    };

    this.onClickNextStep = this.onClickNextStep.bind(this);
    this.onClickPreviousStep = this.onClickPreviousStep.bind(this);

    if (process.env.ENV !== 'production') {
      if (!props.steps || props.steps.length === 0) {
        console.error('A wizard needs at least 1 step');
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClickNextStep() {
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
  }

  onClickPreviousStep() {
    if (this.state.activeStep > 0) {
      if (this.props.steps[this.state.activeStep].previousHandler) {
        this.props.steps[this.state.activeStep].previousHandler(this.decreaseStep.bind(this));
      } else {
        this.decreaseStep();
      }
    }
  }

  getCssClasses() {
    let cssClasses = ['wizard'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
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
        className={this.props.steps[this.state.activeStep].className}
        isActive={this.props.isActive}
        overlayDisabled
      >
        <ModalHeader closeHandler={closeHandler}>
          Header
        </ModalHeader>
        <ModalContent>
          {this.renderModalContent()}
        </ModalContent>
        <ModalFooter isActions>
          {previousStepButtonNode}
          <Button onClick={this.onClickNextStep}>{this.getNextButtonText()}</Button>
        </ModalFooter>
      </Modal>
    );
  }

  renderStep() {
    if (this.props.steps[this.state.activeStep].type === 'modal') {
      return this.renderModal();
    }

    if (process.env.ENV !== 'production') {
      if (!this.props.steps[this.state.activeStep].highlightElements || this.props.steps[this.state.activeStep].highlightElements.length === 0) {
        console.error('A wizard step of intro needs to have at least 1 highlight element');
      }
    }

    if (this.props.steps[this.state.activeStep].highlightElements && this.props.steps[this.state.activeStep].highlightElements.length > 0) {
      const highlightElements = [];

      this.props.steps[this.state.activeStep].highlightElements.forEach((configuration, key) => {
        const content = key === 0 ? this.props.steps[this.state.activeStep].content : null;

        highlightElements.push(
          <WizardHighlightElement
            key={key}
            configuration={configuration}
            className={this.props.steps[this.state.activeStep].className}
            onClickNextStep={this.onClickNextStep}
            onClickPreviousStep={this.onClickPreviousStep}
            nextButtonText={this.getNextButtonText()}
            previousButtonText={this.props.previousButtonText}
          >
            {content}
          </WizardHighlightElement>
        );
      });

      return highlightElements;
    }
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(
          this.props,
          'className',
          'steps',
          'isActive',
          'closeHandler',
          'allowExit',
          'allowGoingBackwards',
          'previousButtonText',
          'nextButtonText',
          'finishButtonText'
        )}
      >
        {this.renderStep()}
        <Overlay isActive={this.props.isActive} />
      </div>
    );
  }
}

Wizard.displayName = 'Wizard';

Wizard.propTypes = {
  className: React.PropTypes.string,
  steps: React.PropTypes.array.isRequired,
  isActive: React.PropTypes.bool,
  closeHandler: React.PropTypes.func.isRequired,
  allowExit: React.PropTypes.bool,
  allowGoingBackwards: React.PropTypes.bool,
  previousButtonText: React.PropTypes.string,
  nextButtonText: React.PropTypes.string,
  finishButtonText: React.PropTypes.string,
  initialStep: React.PropTypes.number
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
