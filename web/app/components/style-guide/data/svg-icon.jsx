var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var SvgIcon = nucleusReact.components.SvgIcon;

module.exports = {
  name: 'SVG Icon',
  type: 'component',
  overview: (
    <p>
      This component makes it easier to work with SVG icons.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'svgPath',
    defaultValue: 'null',
    description: 'The path to the SVG icon file.',
    required: true
  }, {
    type: 'string',
    name: 'fragment',
    defaultValue: 'null',
    description: 'The fragment name in the icon to use if using a svg icon.'
  }, {
    type: 'string',
    name: 'size',
    defaultValue: 'null',
    description: 'The size of the icon you want to use.'
  }, {
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'Additional CSS classes to add to the SVG element.'
  }],
  examples: [{
    description: (
      <p>
        Standard display of SVG requires the <code>svgPath</code> and <code>fragment</code> properties to be set.
      </p>
    ),
    example: (
      <SvgIcon fragment="play" />
    ),
    exampleString: '<SvgIcon fragment="play" />'
  }, {
    description: (
      <p>
        You can specific the <code>size</code> property.
      </p>
    ),
    example: (
      <SvgIcon
        fragment="play"
        size="small" />
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tsize="small" />'
  }, {
    description: (
      <p>
        You can provide additional CSS classes with the <code>className</code> property.
      </p>
    ),
    example: (
      <SvgIcon
        fragment="play"
        className="m-safe" />
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tclassName="m-safe" />'
  }]
};
