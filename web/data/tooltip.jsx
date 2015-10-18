var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var tooltipMixin = nucleusReact.mixins.tooltip;

var HoverTooltip = React.createClass({
  mixins: [
    tooltipMixin
  ],

  getTooltipContent: function(className) {
    return (
      <div className={className}>
        This is hover content
      </div>
    );
  },

  render: function() {
    return (
      <div className="tooltip">
        <span className="tooltip__handle">tooltip handle</span>
      </div>
    );
  }
});

var StickyTooltip = React.createClass({
  mixins: [
    tooltipMixin
  ],

  getTooltipContent: function(className) {
    return (
      <div className={className}>
        This is hover content
      </div>
    );
  },

  getTooltipStickyContent: function(className) {
    return (
      <div className={className}>
        This is sticky content
      </div>
    );
  },

  render: function() {
    return (
      <div className="tooltip">
        <span className="tooltip__handle">tooltip handle</span>
      </div>
    );
  }
});

module.exports = {
  name: 'Tooltip',
  type: 'mixin',
  overview: (
    <span>
      <p>
        This is the tooltip component.  It provides functionality for displaying a tooltip on hover and on click.  This tooltip mixin can be added to any component.  You need to specify an element with the <code>class</code> of <code>tooltip__handle</code> which will be used as the handle for the tooltip content.
      </p>
    </span>
  ),
  notes: [
    (
      <span>This component is compatible with the single panel system</span>
    )
  ],
  properties: [{
    type: 'string',
    name: 'tooltipVertical',
    defaultValue: 'bottom',
    description: 'The default positioning vertically for the tooltip content.',
    validValues: [
      'top',
      'center',
      'bottom'
    ]
  }, {
    type: 'string',
    name: 'tooltipHorizontal',
    defaultValue: 'right',
    description: 'The default positioning horizontally for the tooltip content.',
    validValues: [
      'left',
      'center',
      'right'
    ]
  }, {
    type: 'number',
    name: 'tooltipShowDelay',
    defaultValue: '0',
    description: 'How long in milliseconds to delay showing the tooltip content.'
  }, {
    type: 'number',
    name: 'tooltipHideDelay',
    defaultValue: '0',
    description: 'How long in milliseconds to delay hiding the tooltip content.'
  }, {
    type: 'boolean',
    name: 'tooltipFixed',
    defaultValue: 'false',
    description: 'Whether or not the tooltip should be fixed position (needed if you want to have a tooltip in an element that is fixed positioned).'
  }, {
    type: 'number',
    name: 'tooltipSpacing',
    defaultValue: '5',
    description: 'How much spacing the tooltip content should have from its handle.'
  }],
  examples: [{
    description: (
      <p>Specify a method called <code>getTooltipContent</code> that will render the content to display for a hover tooltip</p>
    ),
    example: (
      <HoverTooltip />
    ),
    exampleString: 'var HoverTooltip = React.createClass({\n\tmixins: [\n\t\ttooltipMixin\n\t],\n\n\tgetTooltipContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is hover content\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div className="tooltip">\n\t\t\t\t<span className="tooltip__handle">tooltip handle</span>\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<HoverTooltip />\n\t);\n}'
  }, {
    description: (
      <p>Specify a method called <code>getTooltipStickyContent</code> that will render the content to display for a click tooltip (and will be sticky even if you move the mouse away from the handle/content)</p>
    ),
    example: (
      <StickyTooltip />
    ),
    exampleString: 'var StickyTooltip = React.createClass({\n\tmixins: [\n\t\ttooltipMixin\n\t],\n\n\tgetTooltipContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is hover content\n\t\t\t</div>\n\t\t);\n\t},\n\n\tgetTooltipStickyContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is sticky content\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div className="tooltip">\n\t\t\t\t<span className="tooltip__handle">tooltip handle</span>\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<StickyTooltip />\n\t);\n}'
  }, {
    description: (
      <p>You can specific where you want the tooltip to be display by specifying the <code>tooltipVertical</code> and <code>tooltipHorizontal</code> property on the component that has the tooltipMixin</p>
    ),
    example: (
      <StickyTooltip
        tooltipVertical="top"
        tooltipHorizontal="left" />
    ),
    exampleString: 'var StickyTooltip = React.createClass({\n\tmixins: [\n\t\ttooltipMixin\n\t],\n\n\tgetTooltipContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is hover content\n\t\t\t</div>\n\t\t);\n\t},\n\n\tgetTooltipStickyContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is sticky content\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div className="tooltip">\n\t\t\t\t<span className="tooltip__handle">tooltip handle</span>\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<StickyTooltip\n\t\t\ttooltipVertical="top"\n\t\t\ttooltipHorizontal="left" />\n\t);\n}'
  }, {
    description: (
      <p>You can delay the display of the tooltip content by specify the <code>tooltipShowDelay</code> property.</p>
    ),
    example: (
      <StickyTooltip
        tooltipShowDelay={1000} />
    ),
    exampleString: 'var StickyTooltip = React.createClass({\n\tmixins: [\n\t\ttooltipMixin\n\t],\n\n\tgetTooltipContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is hover content\n\t\t\t</div>\n\t\t);\n\t},\n\n\tgetTooltipStickyContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is sticky content\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div className="tooltip">\n\t\t\t\t<span className="tooltip__handle">tooltip handle</span>\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<StickyTooltip\n\t\t\ttooltipShowDelay={1000} />\n\t);\n}'
  }, {
    description: (
      <p>You can delay the hiding of the tooltip content by specify the <code>tooltipHideDelay</code> property (this can allow the user to move the mouse over the content and have it remain open).</p>
    ),
    example: (
      <StickyTooltip
        tooltipHideDelay={1000} />
    ),
    exampleString: 'var StickyTooltip = React.createClass({\n\tmixins: [\n\t\ttooltipMixin\n\t],\n\n\tgetTooltipContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is hover content\n\t\t\t</div>\n\t\t);\n\t},\n\n\tgetTooltipStickyContent: function(className) {\n\t\treturn (\n\t\t\t<div className={className}>\n\t\t\t\tThis is sticky content\n\t\t\t</div>\n\t\t);\n\t},\n\n\trender: function() {\n\t\treturn (\n\t\t\t<div className="tooltip">\n\t\t\t\t<span className="tooltip__handle">tooltip handle</span>\n\t\t\t</div>\n\t\t);\n\t}\n});\n\n//...\n\nrender: function() {\n\treturn (\n\t\t<StickyTooltip\n\t\t\ttooltipHideDelay={1000} />\n\t);\n}'
  }],
  knownIssues: [
    (
      <span>
        The <code>tooltipSpacing</code> property is a hacky solution and should be something that is defined with CSS
      </span>
    )
  ]
};
