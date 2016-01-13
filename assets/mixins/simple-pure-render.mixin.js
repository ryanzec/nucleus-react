//TODO: figure out how to unit test this
var simplePureRenderMixin = {};

/* istanbul ignore next */
simplePureRenderMixin.shouldComponentUpdate = function(nextProps) {
  if (!this.props.simpleCheck && !this.props.simpleChecks) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('You must specific the property simpleCheck (single check) or simpleChecks (multiple checks) in order for the simple pure render mixin to determine in a render need to happen');
    }

    return true;
  }

  var hasFalseCheck = false;

  if (this.props.simpleCheck) {
    hasFalseCheck = this.props.simpleCheck !== nextProps.simpleCheck;
  } else {
    var propertyNames = Object.keys(this.props.simpleChecks);
    var propertyCount = propertyNames.length;

    for (var x = 0; x < propertyCount; x += 1) {
      if (this.props.simpleChecks[propertyNames[x]] !== nextProps.simpleChecks[propertyNames[x]]) {
        hasFalseCheck = true;
        break;
      }
    }
  }

  return hasFalseCheck;
};

module.exports = simplePureRenderMixin;
