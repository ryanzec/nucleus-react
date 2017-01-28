import React from 'react';

import CodeExample from '../../react/components/code-example';
import ButtonGroup from '../../../../src/components/button-group';
import Button from '../../../../src/components/button';

import InteractiveExample from './assets/examples/buttons/interactive';

import { readFileSync } from 'fs';
import { join } from 'path';

const interactiveExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/interactive.js'), 'utf8');

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
  }

  onChangeInput(event) {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');
    var value = getInputValueFromEvent(event);

    var newFormData = onChangeInputStateUpdater.call(this, this.props[formName], {
      fieldName: fieldName,
      value: value,
      markAsDirty: event.target.getAttribute('type') === 'checkbox' || event.target.getAttribute('type') === 'radio'
    });

    this.props.dispatch(buttonExampleFormActions.set(newFormData));
  }

  onBlurInput(event) {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');

    var newFormData = onBlurInputStateUpdater.call(this, this.props[formName], {
      fieldName: fieldName
    });

    this.props.dispatch(buttonExampleFormActions.set(newFormData));
  }

  render() {
    return (
      <div className="p-style-guide-buttons">
        <h1>Buttons</h1>
        <h2>Interactive Example</h2>
        <p>This interactive example allows you to play around with all the options of the button to see how everything works.</p>
        <CodeExample
          exampleComponent={InteractiveExample}
          codeContent={interactiveExampleContent}
        />
        <ButtonGroup>
          <Button styleType="success">Button 1</Button>
          <Button isPill isThin>Button 2</Button>
          <Button styleType="danger" isThin>Button 3</Button>
          <Button styleType="warning">Button 4</Button>
          <Button>Button 5</Button>
          <Button styleType="info" isThin>Button 6</Button>
        </ButtonGroup>
      </div>
    );
  }
}

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
