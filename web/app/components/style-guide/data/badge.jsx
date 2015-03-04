var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Badge = nucleusReact.components.Badge;

module.exports = {
  name: 'Badge',
  type: 'component',
  overview: (
    <p>
      Badge component for calling out data.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to the pill.'
  }],
  examples: [{
    description: (
      <p>
        Standard badge.
      </p>
    ),
    example: (
      <Badge>Standard</Badge>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        If you you wish to have it look like a pill (having the side being completely curved), add the <code>m-pill</code> class.
      </p>
    ),
    example: (
      <Badge className="m-pill">Standard</Badge>
    ),
    exampleString: '<Badge className="m-pill">Standard</Badge>'
  }, {
    description: (
      <p>
        Badges support different colors with the <code>m-safe</code>, <code>m-notice</code>, <code>m-warning</code>, and <code>m-danger</code> classes.
      </p>
    ),
    example: (
      <span>
        <Badge className="m-safe">Safe</Badge>
        <Badge className="m-notice">Notice</Badge>
        <Badge className="m-warning">Warning</Badge>
        <Badge className="m-danger">Danger</Badge>
      </span>
    ),
    exampleString: '<Badge className="m-safe">Safe</Badge>\n<Badge className="m-notice">Notice</Badge>\n<Badge className="m-warning">Warning</Badge>\n<Badge className="m-danger">Danger</Badge>'
  }]
};
