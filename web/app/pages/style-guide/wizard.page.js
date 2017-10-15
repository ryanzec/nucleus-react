import PropTypes from 'prop-types';
import React from 'react';

import Wizard from '../../../../src/components/wizard';
import Button from '../../../../src/components/button';


const codeContent = 'p {\n\tcolor: red;\n}';

class WizardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wizardIsActive: false
    };
  }

  componentDidMount() {
    this.setState({
      wizardIsActive: true
    });
  }

  closeHandler = () => {
    this.setState({
      wizardIsActive: false
    });
  };

  openHandler = () => {
    this.setState({
      wizardIsActive: true
    });
  };

  renderWizardOneContent() {
    return (
      <div>
        I'm content man
      </div>
    );
  }

  renderWizardTwoContent() {
    return (
      <div>
        I'm content man 22 (scroll down)
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        Hi!
      </div>
    );
  }

  renderWizardThreeContent() {
    return (
      <div>
        I'm content man 333
      </div>
    );
  }

  render() {
    return (
      <div className="p-style-guide-wizard">
        <h1>Wizard</h1>
        <h2>Another Element</h2>
        <h3>3 elements on a page, that blaspheme</h3>
        <Button onClick={this.openHandler}>open wizard</Button>
        <Wizard
          isActive={this.state.wizardIsActive}
          steps={[{
            type: 'modal',
            title: 'Step 1',
            content: this.renderWizardOneContent(),
            nextHandler: (increaseStep) => {
              console.log('step1 done');
              increaseStep();
            }
          }, {
            type: 'modal',
            content: this.renderWizardTwoContent(),
            className: 'modal-testing',
            previousHandler: (decreaseStep) => {
              console.log('move backwards from step2');
              decreaseStep();
            }
          }, {
            type: 'modal',
            title: 'Step 3',
            content: this.renderWizardThreeContent(),
            nextHandler: (increaseStep) => {
              console.log('wizard done');
              increaseStep();
            }
          }]}
          closeHandler={this.closeHandler}
          allowExit={true}
        />
      </div>
    );
  }
}

WizardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default WizardPage;
