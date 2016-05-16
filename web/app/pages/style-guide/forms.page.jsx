import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import Form from '../../../../assets/components/form.component.jsx';
import FormCheckbox from '../../../../assets/components/form-checkbox.component.jsx';
import FormFile from '../../../../assets/components/form-file.component.jsx';
import FormGroup from '../../../../assets/components/form-group.component.jsx';
import FormInputGroup from '../../../../assets/components/form-input-group.component.jsx';
import FormInputGroupAddon from '../../../../assets/components/form-input-group-addon.component.jsx';
import FormInputGroupButton from '../../../../assets/components/form-input-group-button.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormRadio from '../../../../assets/components/form-radio.component.jsx';
import FormSelect from '../../../../assets/components/form-select.component.jsx';
import FormSelectOption from '../../../../assets/components/form-select-option.component.jsx';
import FormStaticText from '../../../../assets/components/form-static-text.component.jsx';
import FormTextbox from '../../../../assets/components/form-textbox.component.jsx';
import FormTextboxCounter from '../../../../assets/components/form-textbox-counter.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';
import GridContainer from '../../../../assets/components/grid-container.component.jsx';

import DropDown from '../../../../assets/components/drop-down.component.jsx';
import DropDownButtonToggle from '../../../../assets/components/drop-down-button-toggle.component.jsx';
import DropDownMenu from '../../../../assets/components/drop-down-menu.component.jsx';
import DropDownMenuItem from '../../../../assets/components/drop-down-menu-item.component.jsx';
import DropDownMenuHeader from '../../../../assets/components/drop-down-menu-header.component.jsx';
import DropDownMenuDivider from '../../../../assets/components/drop-down-menu-divider.component.jsx';

class FormsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDown1IsActive: false,
      dropDown2IsActive: false,
      value: ''
    };

    this.onClickDropDown1Toggle = this.onClickDropDown1Toggle.bind(this);
    this.onClickDropDown2Toggle = this.onClickDropDown2Toggle.bind(this);
    this.onChangeFirstField = this.onChangeFirstField.bind(this);
  }

  onClickDropDown1Toggle() {
    this.setState({
      dropDown1IsActive: !this.state.dropDown1IsActive
    })
  }

  onClickDropDown2Toggle() {
    this.setState({
      dropDown2IsActive: !this.state.dropDown2IsActive
    })
  }

  onChangeFirstField(event) {
    this.setState({
      value: event.target.value
    });
  }

  render() {
    var radioOptions1 = [{
      value: 'option1',
      display: 'Option one is this and that&mdash;be sure to include why it\'s great'
    }, {
      value: 'option2',
      display: 'Option two can be something else and selecting it will deselect option one'
    }, {
      value: 'option3',
      display: 'Option three is disabled',
      disabled: true
    }];

    return (
      <div className="p-style-guide-forms">
        <h1 className="test">Forms</h1>
        <h4>Form Groups</h4>
        <Form>
          <FormGroup>
            <FormLabel>Example label</FormLabel>
            <FormTextboxCounter
              type="text"
              placeholder="Example input"
              value={this.state.value}
              onChange={this.onChangeFirstField}
              warningLimit={10}
              maxLimit={50}
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Another input</FormLabel>
            <FormTextboxCounter align="right" type="text" placeholder="Another input" />
          </FormGroup>
        </Form>
        <h4>Inline Form</h4>
        <Form isInline={true}>
          <FormGroup>
            <FormLabel>Name</FormLabel>
            <FormTextbox type="text" placeholder="Jane Doe" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Email</FormLabel>
            <FormTextboxCounter  type="email" placeholder="jane.doe@example.com" />
          </FormGroup>
          <Button type="submit" styleType="primary">Send invitation</Button>
        </Form>
        <h4>Hidden Labels</h4>
        <Form isInline={true}>
          <FormGroup>
            <FormLabel isHidden={true}>Email address</FormLabel>
            <FormTextbox type="email" placeholder="Enter email" />
          </FormGroup>
          <FormGroup>
            <FormLabel isHidden={true}>Password</FormLabel>
            <FormTextboxCounter align="right" type="password" placeholder="Password" />
          </FormGroup>
          <FormCheckbox>Remember me</FormCheckbox>
          <Button type="submit" styleType="primary">Sign in</Button>
        </Form>
        <Form isInline={true}>
          <FormGroup>
            <FormLabel isHidden={true}>Amount (in dollars)</FormLabel>
            <FormInputGroup>
              <FormInputGroupAddon>$</FormInputGroupAddon>
              <FormTextbox type="text" placeholder="Amount" />
              <FormInputGroupAddon>.00</FormInputGroupAddon>
            </FormInputGroup>
          </FormGroup>
          <Button type="submit" styleType="primary">Transfer cash</Button>
        </Form>
        <h4>With Grid</h4>
        <Form>
          <GridContainer>
            <FormGroup useGrid={true}>
              <FormLabel useControlStyle={true} smallSize={2}>Email</FormLabel>
              <GridColumn smallSize={10}>
                <FormTextboxCounter  type="email" placeholder="Email" />
              </GridColumn>
            </FormGroup>
            <FormGroup useGrid={true}>
              <FormLabel useControlStyle={true} smallSize={2}>Password</FormLabel>
              <GridColumn smallSize={10}>
                <FormTextbox type="password" placeholder="Password" />
              </GridColumn>
            </FormGroup>
            <FormGroup useGrid={true}>
              <FormLabel smallSize={2}>Radios</FormLabel>
              <GridColumn smallSize={10}>
                <FormRadio name="gridRadios" value="option1" checked>Option one is this and that&mdash;be sure to include why it's great</FormRadio>
                <FormRadio name="gridRadios" value="option2">Option two can be something else and selecting it will deselect option one</FormRadio>
                <FormRadio name="gridRadios" value="option3" disabled>Option three is disabled</FormRadio>
              </GridColumn>
            </FormGroup>
            <FormGroup useGrid={true}>
              <FormLabel smallSize={2}>Checkbox</FormLabel>
              <GridColumn smallSize={10}>
                <FormCheckbox>Check me out</FormCheckbox>
              </GridColumn>
            </FormGroup>
            <FormGroup useGrid={true}>
              <GridColumn smallOffset={2} smallSize={10}>
                <Button type="submit" styleType="primary">Sign in</Button>
              </GridColumn>
            </FormGroup>
          </GridContainer>
        </Form>
        <h4>Checkboxes and radios</h4>
        <FormCheckbox value="">Option one is this and that&mdash;be sure to include why it's great</FormCheckbox>
        <FormCheckbox value="" disabled>Option two is disabled</FormCheckbox>
        <FormRadio name="exampleRadios" value="option1" checked>Option one is this and that&mdash;be sure to include why it's great</FormRadio>
        <FormRadio name="exampleRadios" value="option2">Option two can be something else and selecting it will deselect option one</FormRadio>
        <FormRadio name="exampleRadios" value="option3" disabled>Option three is disabled</FormRadio>
        <h4>Inline checkboxes and radios</h4>
        <FormGroup>
          <FormCheckbox value="" isInline={true}>1</FormCheckbox>
          <FormCheckbox value="" isInline={true}>2</FormCheckbox>
          <FormCheckbox value="" isInline={true}>3</FormCheckbox>
        <FormGroup>
        </FormGroup>
          <FormRadio name="exampleRadios" value="option1" isInline={true}>1</FormRadio>
          <FormRadio name="exampleRadios" value="option2" isInline={true}>2</FormRadio>
          <FormRadio name="exampleRadios" value="option3" isInline={true}>3</FormRadio>
        </FormGroup>
        <h4>No labeled checkboxes and radios</h4>
        <FormCheckbox value=""></FormCheckbox>
        <FormRadio name="exampleRadios" value="option1"></FormRadio>
        <GridContainer>
          <h4>Static Element</h4>
          <Form>
            <FormGroup useGrid={true}>
              <FormLabel smallSize={2} useControlStyle={true}>Email</FormLabel>
              <GridColumn smallSize={10}>
                <FormStaticText>email@example.com</FormStaticText>
              </GridColumn>
            </FormGroup>
            <FormGroup useGrid={true}>
              <FormLabel smallSize={2} useControlStyle={true}>Password</FormLabel>
              <GridColumn smallSize={10}>
                <FormTextbox type="password" placeholder="Password" />
              </GridColumn>
            </FormGroup>
          </Form>
        </GridContainer>
        <Form isInline={true}>
          <FormGroup>
            <FormLabel isHidden={true}>Email</FormLabel>
            <FormStaticText>email@example.com</FormStaticText>
          </FormGroup>
          <FormGroup>
            <FormLabel isHidden={true}>Password</FormLabel>
            <FormTextbox type="password" placeholder="Password" />
          </FormGroup>
          <Button type="submit" styleType="primary">Confirm identity</Button>
        </Form>
        <h4>Disabled</h4>
        <Form>
          <FormGroup>
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" disabled />
          </FormGroup>
          <FormGroup>
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" disabled />
          </FormGroup>
          <FormGroup>
            <FormLabel>Disabled select menu</FormLabel>
            <FormSelect disabled>
              <FormSelectOption>Disabled select</FormSelectOption>
            </FormSelect>
          </FormGroup>
          <FormCheckbox disabled>Can't check this</FormCheckbox>
          <FormRadio disabled>Can't radio this</FormRadio>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <h4>Read Only</h4>
        <Form>
          <FormGroup>
            <FormLabel>Read only input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" readOnly />
          </FormGroup>
          <FormGroup>
            <FormLabel>Bio</FormLabel>
            <FormTextbox placeholder="Bio..." elementType="textarea" readOnly />
          </FormGroup>
        </Form>
        <h4>Sizes</h4>
        <Form>
          <FormGroup>
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" size="lg" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" size="lg" />
          </FormGroup>
          <FormGroup>
            <FormLabel>Disabled select menu</FormLabel>
            <FormSelect size="lg">
              <FormSelectOption>Disabled select</FormSelectOption>
            </FormSelect>
          </FormGroup>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <Form>
          <FormGroup>
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" size="sm" />
            <small className="text-muted">
              Some inline text with a small tag looks like this.
            </small>
          </FormGroup>
          <FormGroup>
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" size="sm" />
            <small className="text-muted">
              Some inline text with a small tag looks like this.
            </small>
          </FormGroup>
          <FormGroup>
            <FormLabel>Disabled select menu</FormLabel>
            <FormSelect size="sm">
              <FormSelectOption>Disabled select</FormSelectOption>
            </FormSelect>
            <small className="text-muted">
              Some inline text with a small tag looks like this.
            </small>
          </FormGroup>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <h4>Validation</h4>
        <Form>
          <FormGroup validation="success">
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" validation="success" />
          </FormGroup>
          <FormGroup validation="success">
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" validation="success" />
          </FormGroup>
          <FormGroup validation="success">
            <FormLabel>Select menu</FormLabel>
            <FormSelect>
              <FormSelectOption>Option 1</FormSelectOption>
              <FormSelectOption>Option 2</FormSelectOption>
              <FormSelectOption>Option 3</FormSelectOption>
            </FormSelect>
          </FormGroup>
          <FormGroup validation="success">
            <FormCheckbox>Can't check this</FormCheckbox>
          </FormGroup>
          <FormGroup validation="success">
            <FormRadio>Can't radio this</FormRadio>
          </FormGroup>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <Form>
          <FormGroup validation="warning">
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" validation="warning" />
            <div className="text-warning">Validation message here</div>
          </FormGroup>
          <FormGroup validation="warning">
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" validation="warning" />
            <div className="text-warning">Validation message here</div>
          </FormGroup>
          <FormGroup validation="warning">
            <FormLabel>Select menu</FormLabel>
            <FormSelect>
              <FormSelectOption>Option 1</FormSelectOption>
              <FormSelectOption>Option 2</FormSelectOption>
              <FormSelectOption>Option 3</FormSelectOption>
            </FormSelect>
            <div className="text-warning">Validation message here</div>
          </FormGroup>
          <FormGroup validation="warning">
            <FormCheckbox>Can't check this</FormCheckbox>
            <div className="text-warning">Validation message here</div>
          </FormGroup>
          <FormGroup validation="warning">
            <FormRadio>Can't radio this</FormRadio>
            <div className="text-warning">Validation message here</div>
          </FormGroup>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <Form>
          <FormGroup validation="danger">
            <FormLabel>Disabled input</FormLabel>
            <FormTextbox type="text" placeholder="Disabled input" validation="danger" />
            <div className="text-danger">Valiation message here</div>
          </FormGroup>
          <FormGroup validation="danger">
            <FormLabel>Bio</FormLabel>
            <FormTextbox type="text" placeholder="Bio..." elementType="textarea" validation="danger" />
            <div className="text-danger">Validation message here</div>
          </FormGroup>
          <FormGroup validation="danger">
            <FormLabel>Select menu</FormLabel>
            <FormSelect>
              <FormSelectOption>Option 1</FormSelectOption>
              <FormSelectOption>Option 2</FormSelectOption>
              <FormSelectOption>Option 3</FormSelectOption>
            </FormSelect>
            <div className="text-danger">Validation message here</div>
          </FormGroup>
          <FormGroup validation="danger">
            <FormCheckbox>Can't check this</FormCheckbox>
            <div className="text-danger">Validation message here</div>
          </FormGroup>
          <FormGroup validation="danger">
            <FormRadio>Can't radio this</FormRadio>
            <div className="text-danger">Validation message here</div>
          </FormGroup>
          <Button type="submit" styleType="primary">Submit</Button>
        </Form>
        <h4>Input group sizes</h4>
        <FormInputGroup size="lg">
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup size="lg" position="vertical">
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
        </FormInputGroup>
        <br />
        <FormInputGroup size="lg" position="vertical">
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup>
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup position="vertical">
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
        </FormInputGroup>
        <br />
        <FormInputGroup position="vertical">
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup size="sm">
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup size="sm" position="vertical">
          <FormInputGroupAddon>@</FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
        </FormInputGroup>
        <br />
        <FormInputGroup size="sm" position="vertical">
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>@</FormInputGroupAddon>
        </FormInputGroup>
        <h4>Other elements as input group addons</h4>
        <FormInputGroup>
          <FormInputGroupAddon>
            <input type="checkbox" />
          </FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>
            <input type="checkbox" />
          </FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup>
          <FormInputGroupAddon>
            <input type="radio" />
          </FormInputGroupAddon>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupAddon>
            <input type="radio" />
          </FormInputGroupAddon>
        </FormInputGroup>
        <br />
        <FormInputGroup>
          <FormInputGroupButton>
            <Button styleType="primary">Go</Button>
          </FormInputGroupButton>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupButton>
            <Button styleType="primary">Go</Button>
          </FormInputGroupButton>
        </FormInputGroup>
        <FormInputGroup>
          <FormInputGroupButton isOpened={this.state.dropDown1IsActive}>
            <DropDownButtonToggle onClick={this.onClickDropDown1Toggle}>
              Drop Down Right Aligned
            </DropDownButtonToggle>
            <DropDownMenu>
              <DropDownMenuItem>Action</DropDownMenuItem>
              <DropDownMenuItem>Another action</DropDownMenuItem>
              <DropDownMenuItem>Something else here</DropDownMenuItem>
            </DropDownMenu>
          </FormInputGroupButton>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupButton>
            <Button styleType="primary">Go</Button>
          </FormInputGroupButton>
        </FormInputGroup>
        <FormInputGroup>
          <FormInputGroupButton isOpened={this.state.dropDown2IsActive}>
            <Button styleType="primary">Go</Button>
            <DropDownButtonToggle onClick={this.onClickDropDown2Toggle}>
              Drop Down Right Aligned
            </DropDownButtonToggle>
            <DropDownMenu>
              <DropDownMenuItem>Action</DropDownMenuItem>
              <DropDownMenuItem>Another action</DropDownMenuItem>
              <DropDownMenuItem>Something else here</DropDownMenuItem>
            </DropDownMenu>
          </FormInputGroupButton>
          <FormTextbox type="text" placeholder="Username" />
          <FormInputGroupButton>
            <Button styleType="primary">Go</Button>
          </FormInputGroupButton>
        </FormInputGroup>
      </div>
    );
  }
}

FormsPage.displayName = 'FormsPage';

FormsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default FormsPage;
