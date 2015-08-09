var React = require('react/addons');

var formValidationMessages = {};

formValidationMessages.displayName = 'FormValidationMessages';

formValidationMessages.mixins = [
  React.addons.PureRenderMixin
];

formValidationMessages.propTypes = {
  className: React.PropTypes.string,
  messages: React.PropTypes.array
};

formValidationMessages.getDefaultProps = function formValidationMessagesGetDefaultProps() {
  return {
    className: null,
    messages: []
  };
};

formValidationMessages.getCssClasses = function formValidationMessagesGetCssClasses() {
  var cssClasses = ['form-element__validation-messages'];

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

formValidationMessages.render = function formValidationMessagesRender() {
  var node = null;

  if (this.props.messages && this.props.messages.length > 0) {
    node = (
      <div className={this.getCssClasses().join(' ')}>
        {this.props.messages.map(function(messageObject, key) {
          var className = 'form-element__validation-message';

          if (messageObject.className) {
            className += ' ' + messageObject.className;
          }

          return (
            <div className={className} key={key}>
              {messageObject.message}
            </div>
          );
        })}
      </div>
    );
  }

  return node;
};

module.exports = React.createClass(formValidationMessages);
