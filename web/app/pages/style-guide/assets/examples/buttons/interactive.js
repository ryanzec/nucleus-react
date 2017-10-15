import React from 'react';
import {connect} from 'react-redux';

import {
  onChangeInputStateUpdater,
  onBlurInputStateUpdater,
  getInputValueFromEvent,
} from '../../../../../../../src/utilities/input';

import buttonExampleFormActions from '../../../../../stores/button-example-form/button-example-form.actions';

import FormElement from '../../../../../../../src/components/form/FormElement';
import FormLabel from '../../../../../../../src/components/form/FormLabel';
import FormTextbox from '../../../../../../../src/components/form/FormTextbox';
import FormSelect from '../../../../../../../src/components/form/FormSelect';
import FormSelectOption from '../../../../../../../src/components/form/FormSelectOption';
import FormCheckbox from '../../../../../../../src/components/form/FormCheckbox';
import Button from '../../../../../../../src/components/button/Button';

class ButtonsInteractiveExample extends React.Component {
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
      fieldName: fieldName
    });

    this.props.dispatch(buttonExampleFormActions.set(newFormData));
  };

  onClickButton = () => {
    if (this.props.form.getIn(['doAlert', 'value']) === true) {
      alert('I\'m an alert');
    }
  };

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
