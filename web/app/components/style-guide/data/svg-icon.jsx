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
        You can make it clickable by setting the <code>isClickable</code> property.
      </p>
    ),
    example: (
      <SvgIcon
        isClickable={true}
        onClick={function() {
          alert('clicked');
        }}
        fragment="play"
        size="small" />
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tsize="small" />'
  }, {
    description: (
      <p>
        The <code>isQuiet</code> property can be added for a different style.
      </p>
    ),
    example: (
      <SvgIcon
        isClickable={true}
        isQuiet={true}
        onClick={function() {
          alert('clicked');
        }}
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
  }, {
    description: (
      <p>
        color.
      </p>
    ),
    example: (
      <span>
        <SvgIcon
          fragment="play"
          className="m-safe"
        />
        <SvgIcon
          fragment="play"
          className="m-notice"
        />
        <SvgIcon
          fragment="play"
          className="m-warning"
        />
        <SvgIcon
          fragment="play"
          className="m-danger"
        />
      </span>
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tclassName="m-safe" />'
  }, {
    description: (
      <p>
        clickable indicator.
      </p>
    ),
    example: (
      <span>
        <SvgIcon
          outerClassName="outer-test"
          fragment="eye"
          isClickable={true}
          indicator="new"
        />
      </span>
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tclassName="m-safe" />'
  }, {
    description: (
      <p>
        indicator.
      </p>
    ),
    example: (
      <span>
        <SvgIcon
          outerClassName="outer-test"
          fragment="eye"
          indicator="new"
        />
      </span>
    ),
    exampleString: '<SvgIcon\n\tfragment="play"\n\tclassName="m-safe" />'
  }]
};
