import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { helpers as formDataHelpers } from 'form-data-validation';
import { parseValidationData } from '../../../../src/utilities/input';
import fileUploadFormActions from '../../stores/file-upload-form/file-upload-form.actions';

import FileUploadDragDrop from '../../../../src/components/file-upload/FileUploadDragDrop';
import FormElement from '../../../../src/components/form/FormElement';
import FormValidationMessages from '../../../../src/components/form/FormValidationMessages';
import FormValidationMessage from '../../../../src/components/form/FormValidationMessage';

import { DropTarget } from 'react-dnd'

class FileUploadDragDropPage extends React.Component {
  processFiles = files => {
    let newFormData = formDataHelpers.set(this.props.fileUploadForm, 'fileUpload', files[0]);
    newFormData = formDataHelpers.validate(newFormData, 'fileUpload');

    this.props.dispatch(fileUploadFormActions.set(newFormData));
  };

  renderCurrentFileName() {
    let node = 'None Selected';
    let file = this.props.fileUploadForm.getIn(['fileUpload', 'value']);

    if (file) {
      node = file.name;
    }

    return node;
  }

  render() {
    let validationData = parseValidationData(this.props.fileUploadForm, {fields: ['fileUpload']});

    return (
      <div className="p-style-guide-file-upload-drag-drop">
        <h1>File Upload (DnD)</h1>
        <h2>Basic</h2>
        <div>
          <FileUploadDragDrop
            style={{width: '500px'}}
            processFiles={this.processFiles}
          />
        </div>
        <h2>Clickable</h2>
        <FormElement validation={validationData.status}>
          <FileUploadDragDrop
            processFiles={this.processFiles}
            isClickable={true}
            infoNode="Click or drop file here to upload"
            infoHoverNode="Drop file to upload"
          />
          <div>Current file: {this.renderCurrentFileName()}</div>
          <FormValidationMessages>
            {validationData.messageNodes}
          </FormValidationMessages>
        </FormElement>
      </div>
    );
  }
}

FileUploadDragDropPage.contextTypes = {
  router: PropTypes.object.isRequired
};

let mapStateToProps = (state) => ({
  fileUploadForm: state.fileUploadForm
});

export default connect(mapStateToProps)(FileUploadDragDropPage);
