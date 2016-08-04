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

    this.closeHandler = this.closeHandler.bind(this);
    this.openHandler = this.openHandler.bind(this);
  }

  componentDidMount() {
    this.setState({
      wizardIsActive: true
    });
  }

  closeHandler() {
    this.setState({
      wizardIsActive: false
    });
  }

  openHandler() {
    this.setState({
      wizardIsActive: true
    });
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
            content: "I'm content man",
            nextHandler: (increaseStep) => {
              console.log('step1 done');
              increaseStep();
            }
          }, {
            type: 'modal',
            content: "I'm content man 22",
            className: 'modal-testing',
            previousHandler: (decreaseStep) => {
              console.log('move backwards from step2');
              decreaseStep();
            }
          }, {
            type: 'modal',
            content: "I'm content man 333",
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

WizardPage.displayName = 'WizardPage';

WizardPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default WizardPage;
