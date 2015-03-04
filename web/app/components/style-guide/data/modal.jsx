var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Modal = nucleusReact.components.Modal;
var domEventManagerMixin = nucleusReact.mixins.domEventManager;

var ModalExample = React.createClass({
  mixins: [
    domEventManagerMixin
  ],

  componentDidMount: function() {
    this.addDomEvent(document, 'keyup', this._closeModalOnEscape);
  },

  getInitialState: function() {
    return {
      isModalActive: false,
      lines: 0,
      test: null
    }
  },

  showModal: function() {
    this.setState({
      isModalActive: true
    });
  },

  hideModal: function() {
    this.setState({
      isModalActive: false
    });
  },

  _closeModalOnEscape: function() {
    console.log('escape');
    if(event.which === 27) {
      this.hideModal();
    }
  },

  increaseLineCount: function() {
    this.setState({
      lines: this.state.lines + 3
    });
  },

  handleFormChange: function(event) {
    this.setState({test: event.target.value});
  },

  setRandomFormValue: function() {
    this.setState({
      test: Math.random().toString(36).replace(/[^a-z]+/g, '')
    });
  },

  renderModalContent: function() {
    var lines = [];

    for(var x = 0; x < this.state.lines; x += 1) {
      lines.push(
        <p key={x}>line {x}</p>
      );
    }

    return (
      <div>
        <p><a onClick={this.hideModal}>close me (press escape key will close too)</a></p>
        <p><a onClick={this.increaseLineCount}>add 3 lines</a></p>
        This is the modal window content and making it extra long to testing purposes.<br />
        <input value={this.state.test} onChange={this.handleFormChange} />
        {lines}
      </div>
    );
  },

  render: function() {
    return (
      <span>
        <p>test value from modal: {this.state.test}</p>
        <button onClick={this.setRandomFormValue}>set randon form value</button><br />
        <a onClick={this.showModal}>Toggle Modal</a>
        <Modal
          isActive={this.state.isModalActive}>
          {this.renderModalContent()}
        </Modal>
      </span>
    );
  }
});

module.exports = {
  name: 'Modal',
  type: 'component',
  overview: (
    <p>
      Modal window.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'Additional CSS classes to add to the modal element.'
  }, {
    type: 'object',
    name: 'contentStyles',
    defaultValue: '{}',
    description: 'An object of styles to be applied to the modal content element.'
  }],
  examples: [{
    description: (
      <p>
        Interactive modal window example.
      </p>
    ),
    example: (
      <ModalExample />
    ),
    exampleString: 'var ModalExample = React.createClass({\n\tgetInitialState: function() {\n\t\treturn {\n\t\t\tisModalActive: false,\n\t\t\tlines: 0\n\t\t}\n\t},\n\n\tshowModal: function() {\n\t\tthis.setState({\n\t\t\tisModalActive: true\n\t\t});\n\t},\n\n\thideModal: function() {\n\t\tthis.setState({\n\t\t\tisModalActive: false\n\t\t});\n\t},\n\n\tincreaseLineCount: function() {\n\t\tthis.setState({\n\t\t\tlines: this.state.lines + 3\n\t\t});\n\t},\n\n\trenderModalContent: function() {\n\t\tvar lines = [];\n\n\t\tfor(var x = 0; x < this.state.lines; x += 1) {\n\t\t\tlines.push(\n\t\t\t\t<p key={x}>line {x}</p>\n\t\t\t);\n\t\t}\n\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<p><a onClick={this.hideModal}>close me</a></p>\n\t\t\t\t<p><a onClick={this.increaseLineCount}>add 3 lines</a></p>\n\t\t\t\tThis is the modal window content and making it extra long to testing purposes.\n\t\t\t\t{lines}\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<span>\n\t\t\t\t<a onClick={this.showModal}>Toggle Modal</a>\n\t\t\t\t<Modal\n\t\t\t\t\tisActive={this.state.isModalActive}>\n\t\t\t\t\t{this.renderModalContent()}\n\t\t\t\t</Modal>\n\t\t\t</span>\n\t\t);\n\t}\n});\n\n//...\n\n<ModalExample />'
  }]
};
