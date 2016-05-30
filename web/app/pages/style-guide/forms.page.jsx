import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

import SvgIcon from '../../../../assets/components/svg-icon.component.jsx';

import FormElement from '../../../../assets/components/form-element.component.jsx';
import FormSelect from '../../../../assets/components/form-select.component.jsx';
import FormSelectOption from '../../../../assets/components/form-select-option.component.jsx';
import FormTextbox from '../../../../assets/components/form-textbox.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormTextboxGroup from '../../../../assets/components/form-textbox-group.component.jsx';
import FormValidationMessages from '../../../../assets/components/form-validation-messages.component.jsx';
import FormValidationMessage from '../../../../assets/components/form-validation-message.component.jsx';
import FormCheckbox from '../../../../assets/components/form-checkbox.component.jsx';
import FormRadio from '../../../../assets/components/form-radio.component.jsx';
import FormGroupAddon from '../../../../assets/components/form-textbox-group-addon.component.jsx';
import FormLegend from '../../../../assets/components/form-legend.component.jsx';

import Grid from '../../../../assets/components/grid.component.jsx';
import GridRow from '../../../../assets/components/grid-row.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';

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
