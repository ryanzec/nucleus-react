var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var ReactDOM = require('react-dom');
var domEventManagerMixin = require('../mixins/dom-event-manager.mixin');
var domUtilities = require('dom-utilities');

var modal = {};

modal.displayName = 'Modal';

modal.mixins = [
  ReactPureRenderMixin,
  domEventManagerMixin
];

modal.propTypes = {
  className: React.PropTypes.string
};

modal.getDefaultProps = function modalGetDefaultProps() {
  return {
    className: null
  };
};

/* istanbul ignore next */
modal.componentDidMount = function modalComponentDidMount() {
  //NOTE: this is needed to not display the content out of place since we need to delay the setting of the dimensions
  ReactDOM.findDOMNode(this).querySelector('.modal__content').classList.add('u-invisible');

  this.addDomEvent(window, 'resize', this.reposition);
  this.addDomEvent(window, 'orientationchange', this.reposition);
};

/* istanbul ignore next */
modal.componentDidUpdate = function modalComponentDidUpdate() {
  if (this.props.isActive) {
    //NOTE: this timesout is to help make sure any javascript based styling is done before this component determining the required height for the content
    setTimeout(function modalComponentDidUpdatePositionTimeout() {
      this.setMaxDimensions();
      this.setTrueDimensions();
      this.centerPosition();

      //NOTE: this is needed to not display the content out of place since we need to delay the setting of the dimensions
      ReactDOM.findDOMNode(this).querySelector('.modal__content').classList.remove('u-invisible');
    }.bind(this), 100);
  } else {
    //NOTE: this is needed to not display the content out of place since we need to delay the setting of the dimensions
    ReactDOM.findDOMNode(this).querySelector('.modal__content').classList.add('u-invisible');
  }
};

/* istanbul ignore next */
modal.setTrueDimensions = function modalSetTrueDimensions() {
  var setStylesToGetTrueDimensions = function modalSetTrueDimensionsSetStylesToGetTrueDimensions(modalContentElement) {
    modalContentElement.style.display = 'block';
    modalContentElement.style.top = '0px';
    modalContentElement.style.left = '0px';
    modalContentElement.style.height = 'auto';
    modalContentElement.style.width = 'auto';
  };

  var resetStyleForNormalDisplay = function modalSetTrueDimensionsResetStyleForNormalDisplay(modalContentElement, originalStyles) {
    modalContentElement.style.display = originalStyles.display;
    modalContentElement.style.top = originalStyles.top;
    modalContentElement.style.left = originalStyles.left;
  };

  var setTrueDimensions = function modalSetTrueDimensionsSetTrueDimensions(modalContentElement) {
    var trueDimensions = domUtilities.getDimensions(modalContentElement);
    modalContentElement.style.width = Math.ceil(trueDimensions.width) + 'px';
    modalContentElement.style.height = Math.ceil(trueDimensions.height) + 'px';
  };

  var modalContentElement = ReactDOM.findDOMNode(this).querySelector('.modal__content');
  var originalStyles = {
    display: modalContentElement.style.display,
    top: modalContentElement.style.top,
    left: modalContentElement.style.left
  };

  setStylesToGetTrueDimensions(modalContentElement);
  setTrueDimensions(modalContentElement);
  resetStyleForNormalDisplay(modalContentElement, originalStyles);
};

/* istanbul ignore next */
modal.reposition = function modalReposition() {
  if (this.props.isActive) {
    this.setMaxDimensions();
    this.setTrueDimensions();
    this.centerPosition();
  }
};

/* istanbul ignore next */
modal.setMaxDimensions = function modalSetMaxDimensions() {
  //.9 match the scss max-height: 90%, this value needs to be kept in sync with the sass code
  ReactDOM.findDOMNode(this).querySelector('.modal__content').style.maxHeight = Math.floor(window.innerHeight * 0.9) + 'px';
  ReactDOM.findDOMNode(this).querySelector('.modal__content').style.maxWidth = Math.floor(window.innerWidth * 0.9) + 'px';
};

/* istanbul ignore next */
modal.centerPosition = function modalCenterPosition() {
  var modalContent = ReactDOM.findDOMNode(this).querySelector('.modal__content');
  var dimensions = domUtilities.getDimensions(modalContent);

  modalContent.style.top = Math.floor((window.innerHeight - dimensions.height) / 2) + 'px';
  modalContent.style.left = Math.floor((window.innerWidth - dimensions.width) / 2) + 'px';
};

modal.getCssClasses = function modalGetCssClasses() {
  var cssClasses = ['modal'];
  cssClasses.push('m-center');

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if (this.props.isActive) {
    cssClasses.push('is-active');
  }

  return cssClasses;
};

modal.render = function modalRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="modal__content">{this.props.children}</div>
    </div>
  );
};

module.exports = React.createClass(modal);
