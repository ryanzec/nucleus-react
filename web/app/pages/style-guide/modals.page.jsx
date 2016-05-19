import React from 'react';
import moment from 'moment-timezone';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

import Button from '../../../../assets/components/button.component.jsx';
import Modal from '../../../../assets/components/modal.component.jsx';
import ModalContent from '../../../../assets/components/modal-content.component.jsx';
import ModalHeader from '../../../../assets/components/modal-header.component.jsx';
import ModalBody from '../../../../assets/components/modal-body.component.jsx';
import ModalFooter from '../../../../assets/components/modal-footer.component.jsx';
import ModalTitle from '../../../../assets/components/modal-title.component.jsx';
import Form from '../../../../assets/components/form.component.jsx';
import FormCheckbox from '../../../../assets/components/form-checkbox.component.jsx';
import FormGroup from '../../../../assets/components/form-group.component.jsx';
import FormLabel from '../../../../assets/components/form-label.component.jsx';
import FormRadio from '../../../../assets/components/form-radio.component.jsx';
import FormSelect from '../../../../assets/components/form-select.component.jsx';
import FormSelectOption from '../../../../assets/components/form-select-option.component.jsx';
import FormTextbox from '../../../../assets/components/form-textbox.component.jsx';
import FormTextboxCounter from '../../../../assets/components/form-textbox-counter.component.jsx';
import GridColumn from '../../../../assets/components/grid-column.component.jsx';
import GridContainer from '../../../../assets/components/grid-container.component.jsx';
import DatePicker from 'react-datepicker';
import Select from 'react-select';

const FLAVOURS = [
  { label: 'Chocolate', value: 'chocolate' },
  { label: 'Vanilla', value: 'vanilla' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Caramel', value: 'caramel' },
  { label: 'Cookies and Cream', value: 'cookiescream' },
  { label: 'Peppermint', value: 'peppermint' },
];

class ModalsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalActive: false,
      isFormModalActive: false,
      date: moment(),
      selectValue: null
    };

    this.onClickOpenModal = this.onClickOpenModal.bind(this);
    this.onClickCloseModal = this.onClickCloseModal.bind(this);
    this.onClickOpenFormModal = this.onClickOpenFormModal.bind(this);
    this.onClickCloseFormModal = this.onClickCloseFormModal.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  onClickOpenModal() {
    this.setState({
      isModalActive: true
    });
  }

  onClickCloseModal() {
    this.setState({
      isModalActive: false
    });
  }

  onClickOpenFormModal() {
    this.setState({
      isFormModalActive: true
    });
  }

  onClickCloseFormModal() {
    this.setState({
      isFormModalActive: false
    });
  }

  handleDateChange(value) {
    this.setState({
      date: value
    });
  }

  handleSelectChange(value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <div className="p-style-guide-modals">
        <h1 className="test">Modals</h1>
        <Button onClick={this.onClickOpenModal}>Show Modal</Button>
        <br />
        <Button onClick={this.onClickOpenFormModal}>Form Modal</Button>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Button onClick={this.onClickOpenModal}>Show Modal</Button>
        {/*<Modal isActive={this.state.isModalActive}>
          <ModalContent>
            <ModalHeader>
              <Button className="close" onClick={this.onClickCloseModal}>
                <span aria-hidden="true">&times;</span>
              </Button>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
              <p>One fine body&hellip;</p>
            </ModalBody>
            <ModalFooter>
              <Button styleType="secondary" onClick={this.onClickCloseModal}>Close</Button>
              <Button styleType="primary" onClick={this.onClickCloseModal}>Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>*/}
        <Modal isActive={this.state.isFormModalActive}>
          <ModalContent>
            <ModalHeader>
              <Button className="close" onClick={this.onClickCloseFormModal}>
                <span aria-hidden="true">&times;</span>
              </Button>
              <ModalTitle>Modal title</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form>
                <GridContainer>
                  <FormGroup useGrid={true}>
                    <FormLabel useControlStyle={true} smallSize={2}>Email</FormLabel>
                    <GridColumn smallSize={10}>
                      <FormTextboxCounter  type="email" placeholder="Email" />
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel useControlStyle={true} smallSize={2}>React Select (Bottom)</FormLabel>
                    <GridColumn smallSize={10}>
                      <Select
                        multi
                        simpleValue
                        value={this.state.value}
                        placeholder="Select your favourite(s)"
                        options={FLAVOURS}
                        onChange={this.handleSelectChange}
                      />
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel useControlStyle={true} smallSize={2}>Password</FormLabel>
                    <GridColumn smallSize={10}>
                      <FormTextbox type="password" placeholder="Password" />
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel useControlStyle={true} smallSize={2}>Select menu</FormLabel>
                    <GridColumn smallSize={10}>
                      <FormSelect>
                        <FormSelectOption>Option 1</FormSelectOption>
                        <FormSelectOption>Option 2</FormSelectOption>
                        <FormSelectOption>Option 3</FormSelectOption>
                      </FormSelect>
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel smallSize={2}>Radios</FormLabel>
                    <GridColumn smallSize={10}>
                      <FormRadio name="gridRadios" value="option1" checked>Option one is this and that&mdash;be sure to include why it's great</FormRadio>
                      <FormRadio name="gridRadios" value="option2">Option two can be something else and selecting it will deselect option one</FormRadio>
                      <FormRadio name="gridRadios" value="option3" disabled>Option three is disabled</FormRadio>
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel smallSize={2}>React Select (Top)</FormLabel>
                    <GridColumn smallSize={10}>
                      <Select
                        className="Select-menu-top"
                        multi
                        simpleValue
                        value={this.state.value}
                        placeholder="Select your favourite(s)"
                        options={FLAVOURS}
                        onChange={this.handleSelectChange}
                      />
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel smallSize={2}>Checkbox</FormLabel>
                    <GridColumn smallSize={10}>
                      <FormCheckbox>Check me out</FormCheckbox>
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <GridColumn smallOffset={2} smallSize={10}>
                      <Button type="submit" styleType="primary">Sign in</Button>
                    </GridColumn>
                  </FormGroup>
                  <br /><br /><br /><br />
                  <FormGroup useGrid={true}>
                    <FormLabel smallSize={2}>React Date Picker</FormLabel>
                    <GridColumn smallSize={10}>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        className="form-control"
                        readOnly={true}
                      />
                    </GridColumn>
                  </FormGroup>
                </GridContainer>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button styleType="secondary" onClick={this.onClickCloseFormModal}>Close</Button>
              <Button styleType="primary" onClick={this.onClickCloseFormModal}>Save changes</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    );
  }
}

ModalsPage.displayName = 'ModalsPage';

ModalsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ModalsPage;
