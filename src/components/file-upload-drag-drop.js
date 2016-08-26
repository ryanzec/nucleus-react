import React from 'react';
import ReactDOM from 'react-dom';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import {NativeTypes as nativeTypes} from 'react-dnd-html5-backend';
import {DropTarget as dropTarget} from 'react-dnd';

const fileTarget = {
  drop(props, monitor) {
    props.processFiles(monitor.getItem().files);
  }
};

class FileUploadDragDrop extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onFileSelect = this.onFileSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onFileSelect(event) {
    this.props.processFiles(Array.prototype.slice.call(event.target.files));
  }

  onClick() {
    if (!this.props.isClickable) {
      return;
    }

    ReactDOM.findDOMNode(this.refs.input).click();
  }

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

    return cssClasses;
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
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(
          this.props,
          'className',
          'infoNode',
          'infoHoverNode',
          'isClickable',
          'processFiles',
          'isOver',
          'canDrop',
          'connectDropTarget'
        )}
      >
        {infoNode}
        {this.renderInput()}
      </div>
    );
  }
}

FileUploadDragDrop.displayName = 'FileUploadDragDrop';

FileUploadDragDrop.propTypes = {
  className: React.PropTypes.string,
  infoNode: React.PropTypes.node,
  infoHoverNode: React.PropTypes.node,
  isClickable: React.PropTypes.bool,
  processFiles: React.PropTypes.func.isRequired,

  //NOTE: provided by redux
  isOver: React.PropTypes.bool,
  canDrop: React.PropTypes.bool,
  connectDropTarget: React.PropTypes.func
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
