import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import SvgIcon from '../../../../src/components/svg-icon';

import FormElement from '../../../../src/components/form-element';
import FormSelect from '../../../../src/components/form-select';
import FormSelectOption from '../../../../src/components/form-select-option';
import FormTextbox from '../../../../src/components/form-textbox';
import FormLabel from '../../../../src/components/form-label';
import FormTextboxGroup from '../../../../src/components/form-textbox-group';
import FormValidationMessages from '../../../../src/components/form-validation-messages';
import FormValidationMessage from '../../../../src/components/form-validation-message';
import FormCheckbox from '../../../../src/components/form-checkbox';
import FormRadio from '../../../../src/components/form-radio';
import FormGroupAddon from '../../../../src/components/form-textbox-group-addon';
import FormLegend from '../../../../src/components/form-legend';

import Grid from '../../../../src/components/grid';
import GridRow from '../../../../src/components/grid-row';
import GridColumn from '../../../../src/components/grid-column';

class FormsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" />
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
          </FormElement>
          <FormElement>
            <FormRadio inputAlignment="right">Blah</FormRadio>
            <FormRadio checked={true}>Blah</FormRadio>
          </FormElement>
          <FormElement>
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" />
          </FormElement>
        </div>
        <h2>Hidden Labels</h2>
        <div>
          <FormLegend>Hidden Labels Form</FormLegend>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
          </FormElement>
          <FormElement>
            <FormLabel isHidden={true}>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" />
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
        <h2>Grid</h2>
        <Grid isForm={true}>
          <GridRow>
            <GridColumn>
              <FormLegend>Inline inputs using grid</FormLegend>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormElement>
                <FormLabel isHidden={true}>First Name</FormLabel>
                <FormTextboxGroup>
                  <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
                  <FormTextbox type="text" placeholder="First Name" />
                  <FormGroupAddon>@gmail.com</FormGroupAddon>
                </FormTextboxGroup>
              </FormElement>
            </GridColumn>
            <GridColumn>
              <FormElement  validation="valid">
                <FormLabel isHidden={true}>First Name</FormLabel>
                <FormTextboxGroup>
                  <FormTextbox type="text" placeholder="First Name" />
                  <FormGroupAddon>@gmail.com</FormGroupAddon>
                </FormTextboxGroup>
                <FormValidationMessages>
                  <FormValidationMessage iconFragment="check">Yah!</FormValidationMessage>
                </FormValidationMessages>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormElement validation="invalid">
                <FormLabel isHidden={true}>First Name</FormLabel>
                <FormTextboxGroup>
                  <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
                  <FormTextbox type="text" placeholder="First Name" />
                </FormTextboxGroup>
                <FormValidationMessages>
                  <FormValidationMessage iconFragment="times">Nope!</FormValidationMessage>
                </FormValidationMessages>
              </FormElement>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormLabel isHidden={true}>Last Name</FormLabel>
                <FormTextbox type="text" placeholder="Last Name" />
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormElement>
                <FormLabel isHidden={true}>Bio</FormLabel>
                <FormTextbox type="textarea" placeholder="First Name"></FormTextbox>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormElement>
                <FormLabel isHidden={true}>Blah</FormLabel>
                <FormSelect>
                  <FormSelectOption>Select Something...</FormSelectOption>
                  <FormSelectOption value="1">Something1</FormSelectOption>
                  <FormSelectOption value="2">Something2</FormSelectOption>
                  <FormSelectOption value="3">Something2</FormSelectOption>
                </FormSelect>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormElement>
                <FormCheckbox inputAlignment="right">Blah</FormCheckbox>
                <FormCheckbox checked={true}>Blah</FormCheckbox>
              </FormElement>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormRadio inputAlignment="right">Blah</FormRadio>
                <FormRadio checked={true}>Blah</FormRadio>
              </FormElement>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormLabel isHidden={true}>Last Name</FormLabel>
                <FormTextbox type="file" />
              </FormElement>
            </GridColumn>
          </GridRow>
        </Grid>
        <Grid isForm={true} labelAlignment="right">
          <GridRow>
            <GridColumn>
              <FormLegend>Inline labels using grid</FormLegend>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>First Name</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormTextboxGroup>
                  <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
                  <FormTextbox type="text" placeholder="First Name" />
                  <FormGroupAddon>@gmail.com</FormGroupAddon>
                </FormTextboxGroup>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>Firasdst Nasame</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormTextbox type="textarea" placeholder="First Name"></FormTextbox>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>Firast Nsame</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormSelect>
                  <FormSelectOption>Select Something...</FormSelectOption>
                  <FormSelectOption value="1">Something1</FormSelectOption>
                  <FormSelectOption value="2">Something2</FormSelectOption>
                  <FormSelectOption value="3">Something2</FormSelectOption>
                </FormSelect>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>Fasdasdasdirast</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormCheckbox inputAlignment="right">Blah</FormCheckbox>
                <FormCheckbox checked={true}>Blah</FormCheckbox>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>asde</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormRadio inputAlignment="right">Blah</FormRadio>
                <FormRadio checked={true}>Blah</FormRadio>
              </FormElement>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn smallSize={3}>
              <FormLabel>askjdg ajsh kajdg kasgh</FormLabel>
            </GridColumn>
            <GridColumn>
              <FormElement>
                <FormTextbox type="file" />
              </FormElement>
            </GridColumn>
          </GridRow>
        </Grid>
        <h2>Validation</h2>
        <div>
          <FormLegend displayRequiredDetails={true}>Form Validation</FormLegend>
          <FormElement validation="invalid">
            <FormLabel>First Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
            <FormValidationMessages>
              <FormValidationMessage iconFragment="times">This is required</FormValidationMessage>
              <FormValidationMessage iconFragment="envelope">Not a valid email address</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="valid">
            <FormLabel>Last Name</FormLabel>
            <FormTextboxGroup>
              <FormGroupAddon><SvgIcon fragment="envelope" /></FormGroupAddon>
              <FormTextbox type="text" placeholder="First Name" />
              <FormGroupAddon>@gmail.com</FormGroupAddon>
            </FormTextboxGroup>
            <FormValidationMessages>
              <FormValidationMessage iconFragment="check">Yah!</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="invalid">
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="textarea" placeholder="First Name"></FormTextbox>
            <FormValidationMessages>
              <FormValidationMessage iconFragment="times">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="invalid">
            <FormLabel>Blah</FormLabel>
            <FormSelect>
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
            <FormValidationMessages>
              <FormValidationMessage iconFragment="times">This is required</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="valid">
            <FormLabel>Blah</FormLabel>
            <FormSelect>
              <FormSelectOption>Select Something...</FormSelectOption>
              <FormSelectOption value="1">Something1</FormSelectOption>
              <FormSelectOption value="2">Something2</FormSelectOption>
              <FormSelectOption value="3">Something2</FormSelectOption>
            </FormSelect>
            <FormValidationMessages>
              <FormValidationMessage iconFragment="check">Yah!</FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="invalid">
            <FormCheckbox inputAlignment="right">Blah</FormCheckbox>
            <FormCheckbox checked={true}>Blah</FormCheckbox>
            <FormValidationMessages>
              <FormValidationMessage>
                <SvgIcon className="form-element__validation-icon" fragment="times" />This is required
              </FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="valid">
            <FormRadio inputAlignment="right">Blah</FormRadio>
            <FormRadio checked={true}>Blah</FormRadio>
            <FormValidationMessages>
              <FormValidationMessage>
                <SvgIcon className="form-element__validation-icon" fragment="check" />This is required
              </FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="valid">
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" />
            <FormValidationMessages>
              <FormValidationMessage>
                <SvgIcon className="form-element__validation-icon" fragment="check" />This is required
              </FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
          <FormElement validation="invalid">
            <FormLabel>Last Name</FormLabel>
            <FormTextbox type="file" />
            <FormValidationMessages>
              <FormValidationMessage>
                <SvgIcon className="form-element__validation-icon" fragment="times" />This is required
              </FormValidationMessage>
            </FormValidationMessages>
          </FormElement>
        </div>
      </div>
    );
  }
}

FormsPage.displayName = 'FormsPage';

FormsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FormsPage;
