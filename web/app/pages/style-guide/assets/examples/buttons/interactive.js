import React from 'react';
import {connect} from 'react-redux';

import {
  onChangeInputStateUpdater,
  onBlurInputStateUpdater,
  getInputValueFromEvent,
} from '../../../../../../../src/utilities/input';

import buttonExampleFormActions from '../../../../../stores/button-example-form/button-example-form.actions';

import FormElement from '../../../../../../../src/components/form-element';
import FormLabel from '../../../../../../../src/components/form-label';
import FormTextbox from '../../../../../../../src/components/form-textbox';
import FormSelect from '../../../../../../../src/components/form-select';
import FormSelectOption from '../../../../../../../src/components/form-select-option';
import FormCheckbox from '../../../../../../../src/components/form-checkbox';
import Button from '../../../../../../../src/components/button';

class ButtonsInteractiveExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.onClickButton = this.onClickButton.bind(this);
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

  onClickButton() {
    if (this.props.form.getIn(['doAlert', 'value']) === true) {
      alert('I\'m an alert');
    }
  }

  render() {
      return (
        <span>
          <div>
            <FormElement>
              <FormLabel>Button Text</FormLabel>
              <FormTextbox
                data-form-name="form"
                data-form-field="buttonText"
                placeholder="Button Text"
                onChange={this.onChangeInput}
                onBlur={this.onBlurInput}
                value={this.props.form.getIn(['buttonText', 'value'])}
              />
            </FormElement>
            <FormElement>
              <FormLabel>Style</FormLabel>
              <FormSelect
                data-form-name="form"
                data-form-field="styleType"
                onChange={this.onChangeInput}
                value={this.props.form.getIn(['styleType', 'value'])}
              >
                <FormSelectOption>Default</FormSelectOption>
                <FormSelectOption value="success">Success</FormSelectOption>
                <FormSelectOption value="info">Info</FormSelectOption>
                <FormSelectOption value="warning">Warning</FormSelectOption>
                <FormSelectOption value="danger">Danger</FormSelectOption>
                <FormSelectOption value="link">Link</FormSelectOption>
              </FormSelect>
            </FormElement>
            <FormElement>
              <FormCheckbox
                data-form-name="form"
                data-form-field="isPill"
                onChange={this.onChangeInput}
                checked={this.props.form.getIn(['isPill', 'value'])}
              >
                Is Pill
              </FormCheckbox>
            </FormElement>
            <FormElement>
              <FormCheckbox
                data-form-name="form"
                data-form-field="isThin"
                onChange={this.onChangeInput}
                checked={this.props.form.getIn(['isThin', 'value'])}
              >
                Is Thin
              </FormCheckbox>
            </FormElement>
            <FormElement>
              <FormCheckbox
                data-form-name="form"
                data-form-field="doAlert"
                onChange={this.onChangeInput}
                checked={this.props.form.getIn(['doAlert', 'value'])}
              >
                Alert when button is clicked
              </FormCheckbox>
            </FormElement>
          </div>
          <Button
            styleType={this.props.form.getIn(['styleType', 'value'])}
            isPill={this.props.form.getIn(['isPill', 'value'])}
            isThin={this.props.form.getIn(['isThin', 'value'])}
            onClick={this.onClickButton}
          >
            {this.props.form.getIn(['buttonText', 'value'])}
          </Button>
        </span>
      );
  }
}

let mapStateToProps = (state) => ({
  form: state.buttonExampleForm
});

export default connect(mapStateToProps)(ButtonsInteractiveExample);
