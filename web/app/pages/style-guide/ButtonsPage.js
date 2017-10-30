import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import {API_URL} from 'app/constants/api';

import CodeExample from '../../react/components/CodeExample';
import ButtonGroupButton from 'src/components/button/ButtonGroupButton';

import InteractiveExample from './assets/examples/buttons/ButtonsInteractiveExample';

import { readFileSync } from 'fs';
import { join } from 'path';

const interactiveExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/ButtonsInteractiveExample.js'), 'utf8');

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChangeInput = event => {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');
    var value = getInputValueFromEvent(event);

    var newFormData = onChangeInputStateUpdater.call(this, this.props[formName], {
      fieldName: fieldName,
      value: value,
      markAsDirty: event.target.getAttribute('type') === 'checkbox' || event.target.getAttribute('type') === 'radio'
    });

    this.props.dispatch(buttonExampleFormActions.set(newFormData));
  };

  onBlurInput = event => {
    var formName = event.target.getAttribute('data-form-name');
    var fieldName = event.target.getAttribute('data-form-field');

    var newFormData = onBlurInputStateUpdater.call(this, this.props[formName], {
      fieldName,
    });

    this.props.dispatch(buttonExampleFormActions.set(newFormData));
  };

  onClickButton() {
    const response = axios.get(`${API_URL}/users?delay=1000`);

    console.log(response);
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
        <div>
          <ButtonGroupButton styleType="success" onClick={this.onClickButton}>Button 1</ButtonGroupButton>
          <ButtonGroupButton isPill isThin>Button 2</ButtonGroupButton>
          <ButtonGroupButton styleType="danger" isThin>Button 3</ButtonGroupButton>
          <ButtonGroupButton styleType="warning">Button 4</ButtonGroupButton>
          <ButtonGroupButton>Button 5</ButtonGroupButton>
          <ButtonGroupButton styleType="info" isThin>Button 6</ButtonGroupButton>
        </div>
      </div>
    );
  }
}

ButtonsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ButtonsPage;
