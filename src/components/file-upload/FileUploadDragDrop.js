import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {getPassThroughProperties} from 'src/utilities/component';
import {NativeTypes as nativeTypes} from 'react-dnd-html5-backend';
import {DropTarget as dropTarget} from 'react-dnd';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['file-upload-drap-drop'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isClickable) {
      cssClasses.push('is-clickable');
    }

    if (instance.props.isOver) {
      cssClasses.push('is-over');
    }

    return cssClasses.join(' ');
  };
};

export const createOnFileSelect = () => {
  return (event) => {
    this.props.processFiles(Array.prototype.slice.call(event.target.files));
  };
};

export const createOnClick = (instance) => {
  return () => {
    if (!this.props.isClickable) {
      return;
    }

    ReactDOM.findDOMNode(instance.refs.input).click();
  };
};

const fileTarget = {
  drop(props, monitor) {
    props.processFiles(monitor.getItem().files);
  }
};

class FileUploadDragDrop extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    infoNode: PropTypes.node,
    infoHoverNode: PropTypes.node,
    isClickable: PropTypes.bool,
    processFiles: PropTypes.func.isRequired,
    isOver: PropTypes.bool,
    canDrop: PropTypes.bool,
    connectDropTarget: PropTypes.func
  };

  static defaultProps = {
    className: null,
    infoNode: 'Drop file here to upload',
    infoHoverNode: 'Drop file to upload',
    isClickable: false,
    processFiles: null
  };

  onFileSelect = createOnFileSelect();
  onClick = createOnClick(this);
  getCssClasses = createGetCssClasses(this);

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

export default dropTarget(nativeTypes.FILE, fileTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop()
}))(FileUploadDragDrop);
