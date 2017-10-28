import PropTypes from 'prop-types';
import React from 'react';

import SvgIcon from 'src/components/svg-icon/SvgIcon';
import FormElement from 'src/components/form/FormElement';
import FormSelect from 'src/components/form/FormSelect';
import FormSelectOption from 'src/components/form/FormSelectOption';
import FormTextbox from 'src/components/form/FormTextbox';
import FormLabel from 'src/components/form/FormLabel';
import FormTextboxGroup from 'src/components/form/FormTextboxGroup';
import FormValidationMessages from 'src/components/form/FormValidationMessages';
import FormValidationMessage from 'src/components/form/FormValidationMessage';
import FormCheckbox from 'src/components/form/FormCheckbox';
import FormRadio from 'src/components/form/FormRadio';
import FormGroupAddon from 'src/components/form/FormTextboxGroupAddon';
import FormLegend from 'src/components/form/FormLegend';
import FormDatePicker from 'src/components/form/FormDatePicker';
import FormCheckboxToggle from 'src/components/form/FormCheckboxToggle';


class FormsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDay: null,
    };
  }

  onClickDate = date => {
    this.setState({
      selectedDay: date,
    });
  };

  render() {
    return (
      <div className="p-style-guide-forms">
        <h1>Forms</h1>
        <h2>Basic</h2>
        <div>
          <FormLegend>Block Level Form</FormLegend>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="text" placeholder="Last Name" />
          </FormElement>
          <FormElement>
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="textarea" placeholder="First Name"></FormTextbox>
          </FormElement>
          <FormElement>
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="textarea" placeholder="First Name">HA HA HA HAAAAAA</FormTextbox>
          </FormElement>
          <FormElement>
            <FormLabel>Blah</FormLabel>
            <FormSelect>
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
          </FormElement>
          <FormElement>
            <FormCheckbox inputAlignment="right">Blah</FormCheckbox>
            <FormCheckbox checked={true}>Blah</FormCheckbox>
            <FormCheckbox
              inputAlignment="right"
              disabled
            >
              Blah
            </FormCheckbox>
            <FormCheckbox
              checked
              disabled
            >
              Blah
            </FormCheckbox>
          </FormElement>
          <FormElement>
            <FormLabel>Toggle Checkbox</FormLabel>
            <FormCheckboxToggle />
            <FormCheckboxToggle checked />
          </FormElement>
          <FormElement>
            <FormRadio inputAlignment="right">Blah</FormRadio>
            <FormRadio checked>Blah</FormRadio>
            <FormRadio
              inputAlignment="right"
              disabled
            >
              Blah
            </FormRadio>
            <FormRadio
              disabled
              checked
            >
              Blah
            </FormRadio>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" />
          </FormElement>
          <FormElement>
            <FormLabel>Date</FormLabel>
            <FormDatePicker
              onClickDate={this.onClickDate}
              selectedDay={this.state.selectedDay}
              format="dddd, MMMM Do, YYYY HH:mm:ss Z"
            />
          </FormElement>
        </div>
        <h2>Hidden Labels</h2>
        <div>
          <FormLegend>Hidden Labels Form</FormLegend>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" hasAddon />
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>Last Name</FormLabel>
            <FormTextbox type="text" placeholder="Last Name" />
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>Bio</FormLabel>
            <FormTextbox type="textarea" placeholder="First Name"></FormTextbox>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>Bio</FormLabel>
            <FormTextbox type="textarea" placeholder="First Name">HA HA HA HAAAAAA</FormTextbox>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>Blah</FormLabel>
            <FormSelect>
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
          </FormElement>
          <FormElement>
            <FormCheckbox inputAlignment="right">Blah</FormCheckbox>
            <FormCheckbox checked={true}>Blah</FormCheckbox>
          </FormElement>
          <FormElement>
            <FormRadio inputAlignment="right">Blah</FormRadio>
            <FormRadio checked={true}>Blah</FormRadio>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>Last Name</FormLabel>
            <FormTextbox type="file" />
          </FormElement>
        </div>
        <h2>Validation</h2>
        <div>
          <FormLegend displayRequiredDetails={true}>Form Validation</FormLegend>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon validation="invalid"><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox validation="invalid" type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon validation="invalid">@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
            <FormValidationMessages>
              <FormValidationMessage validation="invalid" iconFragment="times">This is required</FormValidationMessage>
              <FormValidationMessage validation="invalid" iconFragment="envelope">Not a valid email address</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon validation="valid"><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox validation="valid" type="text" placeholder="First Name" hasAddon />
              <FormGroupAddon validation="valid">@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
            <FormValidationMessages>
              <FormValidationMessage validation="valid" iconFragment="check">Yah!</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Bio</FormLabel>
            <FormTextbox validation="invalid" type="textarea" placeholder="First Name"></FormTextbox>
            <FormValidationMessages>
              <FormValidationMessage validation="invalid" iconFragment="times">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Blah</FormLabel>
            <FormSelect validation="invalid">
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
            <FormValidationMessages>
              <FormValidationMessage validation="invalid" iconFragment="times">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Blah</FormLabel>
            <FormSelect validation="valid">
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
            <FormValidationMessages>
              <FormValidationMessage validation="valid" iconFragment="check">Yah!</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormCheckbox validation="invalid" inputAlignment="right">Blah</FormCheckbox>
            <FormCheckbox validation="invalid" checked={true}>Blah</FormCheckbox>
            <FormValidationMessages>
              <FormValidationMessage validation="invalid" iconFragment="times">This is required </FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormRadio validation="valid" inputAlignment="right">Blah</FormRadio>
            <FormRadio validation="valid" checked={true}>Blah</FormRadio>
            <FormValidationMessages>
              <FormValidationMessage validation="valid" iconFragment="check">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" validation="valid" />
            <FormValidationMessages>
              <FormValidationMessage validation="valid" iconFragment="check">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" validation="invalid" />
            <FormValidationMessages>
              <FormValidationMessage validation="invalid" iconFragment="times">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
        </div>
      </div>
    );
  }
}

FormsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default FormsPage;
