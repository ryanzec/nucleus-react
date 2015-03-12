var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Card = nucleusReact.components.Card;
var CardHeader = nucleusReact.components.CardHeader;
var CardContent = nucleusReact.components.CardContent;

module.exports = {
  name: 'Card',
  type: 'component',
  overview: (
    <p>
      Cards.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Card.
      </p>
    ),
    example: (
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Card with header arrow.
      </p>
    ),
    example: (
      <Card>
        <CardHeader renderArrow={true}>Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Card with header arrow pointing up.
      </p>
    ),
    example: (
      <Card>
        <CardHeader renderArrow={true} arrowPosition="top">Header</CardHeader>
        <CardContent>Content</CardContent>
      </Card>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Card with no header.
      </p>
    ),
    example: (
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }, {
    description: (
      <p>
        Card with no header but an arrow.
      </p>
    ),
    example: (
      <Card>
        <CardContent renderArrow={true}>Content</CardContent>
      </Card>
    ),
    exampleString: '<Badge>Standard</Badge>'
  }]
};
