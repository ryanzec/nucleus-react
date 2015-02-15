var React = require('react/addons');
var Overlay = require('../overlay/overlay.component.jsx');
var domUtilities = require('dom-utilities');

var modalClassConfiguration = {};

modalClassConfiguration.mixins = [
  React.addons.PureRenderMixin
];

/* istanbul ignore next */
modalClassConfiguration.componentDidMount = function() {
  window.addEventListener('resize', this._resizeEvent);
};

/* istanbul ignore next */
modalClassConfiguration.componentWillUnmount = function() {
  window.removeEventListener('resize', this._resizeEvent);
};

/* istanbul ignore next */
modalClassConfiguration.componentDidUpdate = function() {
  if(this.props.isActive) {
    this._setTrueDimensions();
    this._centerPosition();
  }
};

modalClassConfiguration.propTypes = {
  className: React.PropTypes.string
};

modalClassConfiguration.getDefaultProps = function() {
  return {
    className: null
  };
};

/* istanbul ignore next */
modalClassConfiguration._setTrueDimensions = function() {
  var setStylesToGetTrueDimensions = function(modalContentElement) {
    modalContentElement.style.visibility = 'hidden';
    modalContentElement.style.display = 'block';
    modalContentElement.style.top = '0px';
    modalContentElement.style.left = '0px';
    modalContentElement.style.height = 'auto';
    modalContentElement.style.width = 'auto';
  };

  var resetStyleForNormalDisplay = function(modalContentElement, originalStyles) {
    modalContentElement.style.visibility = 'visible';
    modalContentElement.style.display = originalStyles.display;
    modalContentElement.style.top = originalStyles.top;
    modalContentElement.style.left = originalStyles.left;
  };

  var setTrueDimensions = function(modalContentElement) {
    var trueDimensions = domUtilities.getDimensions(modalContentElement);
    modalContentElement.style.width = Math.ceil(trueDimensions.width) + 'px';
    modalContentElement.style.height = Math.ceil(trueDimensions.height) + 'px';
  };

  var modalContentElement = this.getDOMNode().querySelector('.modal__content');
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
modalClassConfiguration._resizeEvent = function() {
  if(this.props.isActive) {
    this._setTrueDimensions();
    this._setMaxDimensions();
    this._centerPosition();
  }
};

/* istanbul ignore next */
modalClassConfiguration._setMaxDimensions = function() {
  //.9 match the scss max-height: 90%, this value needs to be kept in sync with the sass code
  this.getDOMNode().querySelector('.modal__content').style.maxHeight = Math.floor(window.innerHeight * 0.9) + 'px';
  this.getDOMNode().querySelector('.modal__content').style.maxWidth = Math.floor(window.innerWidth * 0.9) + 'px';
};

/* istanbul ignore next */
modalClassConfiguration._centerPosition = function() {
  var modalContent = this.getDOMNode().querySelector('.modal__content');
  var dimensions = domUtilities.getDimensions(modalContent);

  modalContent.style.marginTop = Math.floor(dimensions.height / 2) * -1 + 'px';
  modalContent.style.marginLeft = Math.floor(dimensions.width / 2) * -1 + 'px';
};

modalClassConfiguration.getCssClasses = function() {
  var cssClasses = ['modal'];
  cssClasses.push('m-center');

  if(this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  if(this.props.isActive) {
    cssClasses.push('is-active');
  }

  return cssClasses;
};

modalClassConfiguration.render = function() {
  /* jshint ignore:start */
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div className="modal__content">{this.props.children}</div>
      <Overlay isActive={this.props.isActive} />
    </div>
  );
  /* jshint ignore:end */
};

var Modal = React.createClass(modalClassConfiguration);

module.exports = Modal;
