import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';
import {NativeTypes as nativeTypes} from 'react-dnd-html5-backend';
import {DropTarget as dropTarget} from 'react-dnd';

const fileTarget = {
  drop(props, monitor) {
    props.processFiles(monitor.getItem().files);
  }
};

class FileUploadDragDrop extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onFileSelect = event => {
    this.props.processFiles(Array.prototype.slice.call(event.target.files));
  };

  onClick = () => {
    if (!this.props.isClickable) {
      return;
    }

    ReactDOM.findDOMNode(this.refs.input).click();
  };

  getCssClasses() {
    let cssClasses = ['file-upload-drap-drop'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isClickable) {
      cssClasses.push('is-clickable');
    }

    if (this.props.isOver) {
      cssClasses.push('is-over');
    }

    return cssClasses.join(' ');
  }

  renderInput() {
    let inputNode = null;

    if (this.props.isClickable === true) {
      inputNode = (
        <input
          ref="input"
          className="u-hide"
          type="file"
          value=""
          onChange={this.onFileSelect}
        />
      );
    }

    return inputNode;
  }

  render() {
    const infoNode = this.props.isOver ? this.props.infoHoverNode : this.props.infoNode;

    return this.props.connectDropTarget(
      <div
        onClick={this.onClick}
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, FileUploadDragDrop.propTypes)}
      >
        {infoNode}
        {this.renderInput()}
      </div>
    );
  }
}

FileUploadDragDrop.propTypes = {
  className: PropTypes.string,
  infoNode: PropTypes.node,
  infoHoverNode: PropTypes.node,
  isClickable: PropTypes.bool,
  processFiles: PropTypes.func.isRequired,

  //NOTE: provided by redux
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool,
  connectDropTarget: PropTypes.func
};

FileUploadDragDrop.defaultProps = {
  className: null,
  infoNode: 'Drop file here to upload',
  infoHoverNode: 'Drop file to upload',
  isClickable: false,
  processFiles: null
};

export default dropTarget(nativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileUploadDragDrop);
