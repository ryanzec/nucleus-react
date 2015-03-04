var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Overlay = nucleusReact.components.Overlay;

var FullPageOverlay = React.createClass({
  getInitialState: function() {
    return {
      isOverlayActive: false
    };
  },

  showOverlay: function() {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div>
        <button onClick={this.showOverlay}>show</button>
        <Overlay isActive={this.state.isOverlayActive} />
      </div>
    );
  }
});

var FullPageOverlayWithContent = React.createClass({
  getInitialState: function() {
    return {
      isOverlayActive: false
    };
  },

  showOverlay: function() {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div>
        <button onClick={this.showOverlay}>show</button>
        <Overlay isActive={this.state.isOverlayActive} topContent="This is top content" />
      </div>
    );
  }
});

var ElementOverlay = React.createClass({
  getInitialState: function() {
    return {
      isOverlayActive: false
    };
  },

  showOverlay: function() {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 1000);
  },

  render: function() {
    return (
      <div style={{position: 'relative'}}>
        <button onClick={this.showOverlay}>show</button>
        <Overlay isActive={this.state.isOverlayActive} absolutePositioned={true} />
      </div>
    );
  }
});

module.exports = {
  name: 'Overlay',
  type: 'component',
  overview: (
    <p>
      This component adds an overlay element to the page.
    </p>
  ),
  properties: [{
    type: 'boolean',
    name: 'absolutePositioned',
    defaultValue: 'false',
    description: 'Whether or not to position the overlay as absolute.',
    validValues: [
      'true',
      'false'
    ]
  }, {
    type: 'boolean',
    name: 'isActive',
    defaultValue: 'false',
    description: 'Whether or not to display the overlay.',
    validValues: [
      'true',
      'false'
    ]
  }, {
    type: 'object',
    name: 'style',
    defaultValue: '{}',
    description: 'Style object to add to main element.'
  }, {
    type: 'mixed',
    name: 'topContent',
    defaultValue: 'null',
    description: 'Content to render on top of overlay.'
  }],
  examples: [{
    description: (
      <p>By default, the overlay will take up the entire screen</p>
    ),
    example: (
      <FullPageOverlay />
    ),
    exampleString: 'var FullPageOverlay = React.createClass({\n\tgetInitialState: function() {\n\t\treturn {\n\t\t\tisOverlayActive: false\n\t\t};\n\t},\n\n\tshowOverlay: function() {\n\t\tthis.setState({\n\t\t\tisOverlayActive: true\n\t\t});\n\n\t\tsetTimeout(function() {\n\t\t\tthis.setState({\n\t\t\t\tisOverlayActive: false\n\t\t\t});\n\t\t}.bind(this), 1000);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<button onClick={this.showOverlay}>show</button>\n\t\t\t\t<Overlay isActive={this.state.isOverlayActive} />\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<FullPageOverlay />\n\t);\n}'
  }, {
    description: (
      <p>You can also apply an overlay to a specific element by setting the <code>absolutePositioned</code> property to <code>true</code> and the overlay will over the first parent thatt is positioned relative.</p>
    ),
    example: (
      <ElementOverlay />
    ),
    exampleString: 'var ElementOverlay = React.createClass({\n\tgetInitialState: function() {\n\t\treturn {\n\t\t\tisOverlayActive: false\n\t\t};\n\t},\n\n\tshowOverlay: function() {\n\t\tthis.setState({\n\t\t\tisOverlayActive: true\n\t\t});\n\n\t\tsetTimeout(function() {\n\t\t\tthis.setState({\n\t\t\t\tisOverlayActive: false\n\t\t\t});\n\t\t}.bind(this), 1000);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div style={{position: \'relative\'}}>\n\t\t\t\t<button onClick={this.showOverlay}>show</button>\n\t\t\t\t<Overlay isActive={this.state.isOverlayActive} absolutePositioned={true} />\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<ElementOverlay />\n\t);\n}'
  }, {
    description: (
      <p>You can set the <code>topContent</code> property to have an overlay with content that display on the top (designed mainly for text).</p>
    ),
    example: (
      <FullPageOverlayWithContent />
    ),
    exampleString: 'var FullPageOverlayWithContent = React.createClass({\n\tgetInitialState: function() {\n\t\treturn {\n\t\t\tisOverlayActive: false\n\t\t};\n\t},\n\n\tshowOverlay: function() {\n\t\tthis.setState({\n\t\t\tisOverlayActive: true\n\t\t});\n\n\t\tsetTimeout(function() {\n\t\t\tthis.setState({\n\t\t\t\tisOverlayActive: false\n\t\t\t});\n\t\t}.bind(this), 1000);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div>\n\t\t\t\t<button onClick={this.showOverlay}>show</button>\n\t\t\t\t<Overlay isActive={this.state.isOverlayActive} topContent="This is top content" />\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\n<FullPageOverlayWithContent />'
  }]
};
