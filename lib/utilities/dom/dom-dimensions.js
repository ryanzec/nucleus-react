Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomDimensions = function () {
  function DomDimensions(domElement) {
    _classCallCheck(this, DomDimensions);

    this.domElement = domElement;
    this.dimensions = {};

    this.calculateDimensions();
  }

  _createClass(DomDimensions, [{
    key: 'calculateDimensions',
    value: function calculateDimensions() {
      var nodeClientRect = this.domElement.getBoundingClientRect();
      var nodeComputedStyles = window.getComputedStyle(this.domElement);

      this.dimensions = {
        width: parseFloat(nodeClientRect.width),
        height: parseFloat(nodeClientRect.height),
        top: parseFloat(nodeClientRect.top),
        right: parseFloat(nodeClientRect.right),
        bottom: parseFloat(nodeClientRect.bottom),
        left: parseFloat(nodeClientRect.left),
        relativeTop: parseFloat(this.domElement.offsetTop),
        relativeLeft: parseFloat(this.domElement.offsetLeft),
        paddings: {
          top: parseFloat(nodeComputedStyles.paddingTop),
          right: parseFloat(nodeComputedStyles.paddingRight),
          bottom: parseFloat(nodeComputedStyles.paddingBottom),
          left: parseFloat(nodeComputedStyles.paddingLeft)
        },
        margins: {
          top: parseFloat(nodeComputedStyles.marginTop),
          right: parseFloat(nodeComputedStyles.marginRight),
          bottom: parseFloat(nodeComputedStyles.marginBottom),
          left: parseFloat(nodeComputedStyles.marginLeft)
        },
        borders: {
          top: parseFloat(nodeComputedStyles.borderTopWidth),
          right: parseFloat(nodeComputedStyles.borderRightWidth),
          bottom: parseFloat(nodeComputedStyles.borderBottomWidth),
          left: parseFloat(nodeComputedStyles.borderLeftWidth)
        }
      };
    }
  }, {
    key: 'autoSetHeight',
    value: function autoSetHeight() {
      this.domElement.style.height = this.domElement.scrollHeight + this.dimensions.borders.top + this.dimensions.borders.bottom + 'px';
    }
  }]);

  return DomDimensions;
}();

exports.default = DomDimensions;