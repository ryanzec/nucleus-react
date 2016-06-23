import React from 'react';

import Wizard from '../../../../src/components/wizard';

const codeContent = 'p {\n\tcolor: red;\n}';

class WizardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      wizardIsActive: true
    };

    this.closeHandler = this.closeHandler.bind(this);
  }

  closeHandler() {
    this.setState({
      wizardIsActive: false
    });
  }

  render() {
    return (
      <div className="p-style-guide-wizard">
        <h1>Wizard</h1>
        <h2>Another Element</h2>
        <h3>3 elements on a page, that blaspheme</h3>
        <Wizard
          isActive={this.state.wizardIsActive}
          steps={[{
            type: 'modal',
            content: "I'm content bitch",
            nextHandler: (increaseStep) => {
              console.log('step1 done');
              increaseStep();
            }
          }, {
            type: 'modal',
            content: "I'm content bitch 22",
            className: 'modal-testing',
            previousHandler: (decreaseStep) => {
              console.log('move backwards from step2');
              decreaseStep();
            }
          }, {
            type: 'intro',
            highlightElements: [{
              selector: '.p-style-guide-wizard h1',
              padding: 5
            }, {
              selector: '.p-style-guide-wizard h3',
              padding: 15
            }],
            className: 'testing',
            content: (
              <div>WHAT WHAT!!!</div>
            )
          }, {
            type: 'modal',
            content: "I'm content bitch 333",
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
