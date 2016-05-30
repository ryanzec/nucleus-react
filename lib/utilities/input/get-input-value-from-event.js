Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getInputValueFromEvent;
function getInputValueFromEvent(event) {
  var value;

  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    value = event.target.checked;
  } else {
    value = event.target.value;
  }

  return value;
};