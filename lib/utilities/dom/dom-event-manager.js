Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomEventManager = function () {
  function DomEventManager() {
    _classCallCheck(this, DomEventManager);

    this.managedDomEvents = [];
  }

  _createClass(DomEventManager, [{
    key: "add",
    value: function add(element, type, func) {
      element.addEventListener(type, func);

      this.managedDomEvents.push({
        element: element,
        type: type,
        func: func
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.managedDomEvents.length > 0) {
        this.managedDomEvents.forEach(function (event) {
          event.element.removeEventListener(event.type, event.func);
        });
      }
    }
  }]);

  return DomEventManager;
}();

exports.default = DomEventManager;