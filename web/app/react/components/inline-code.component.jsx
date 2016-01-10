var React = require('react');
var commonReact = require('../../../../assets/index');
var _ = require('lodash');

var Code = commonReact.components.Code;

var inlineCode = {};

inlineCode.displayName = 'InlineCode';

inlineCode.getPassThroughProps = function() {
  var props = _.clone(this.props);

  delete props.isInline;

  return props;
};

inlineCode.render = function() {
  return (
    <Code
      isInline={true}
      {...this.getPassThroughProps()}
    >
      {this.props.children}
    </Code>
  );
};

module.exports = React.createClass(inlineCode);
