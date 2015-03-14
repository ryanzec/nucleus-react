var domEventManagerMixin = require('./dom-event-manager.mixin');
var singlePanelMixin = {};

singlePanelMixin.mixins = [
  domEventManagerMixin
];

singlePanelMixin.componentWillMount = function singlePanelMixinComponentWillMount() {
  //need to manually track whether or not to close component on click since we can't use stopPropagation on native events
  this.dontCloseOnClick = false;

  this.addDomEvent(document, 'keyup', this.onKeyUpDocument);
  this.addDomEvent(document, 'click', this.onClickDocument);
};

singlePanelMixin.onKeyUpDocument = function singlePanelMixinOnKeyUpDocument(event) {
  if (event.which === 27) {
    this.singlePanelClose();
  }
};

singlePanelMixin.onClickDocument = function singlePanelMixinOnClickDocument(event) {
  if (this.dontCloseOnClick !== true) {
    this.singlePanelClose();
  }

  this.dontCloseOnClick = false;
};

module.exports = singlePanelMixin;
