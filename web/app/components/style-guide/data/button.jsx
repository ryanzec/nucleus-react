var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Button = nucleusReact.components.Button;

module.exports = {
  name: 'Button',
  type: 'css component',
  overview: (
    <p>
      Buttons!!!.
    </p>
  ),properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to the button.'
  }],
  examples: [{
    description: (
      <p>
        Standard button.
      </p>
    ),
    example: (
      <Button>Standard</Button>
    ),
    exampleString: '<Button>Standard</Button>'
  }, {
    description: (
      <p>
        Buttons support different colors with the <code>m-safe</code>, <code>m-notice</code>, <code>m-warning</code>, and <code>m-danger</code> classes.
      </p>
    ),
    example: (
      <span>
        <Button className="m-safe">Safe</Button>
        <Button className="m-notice">Notice</Button>
        <Button className="m-warning">Warning</Button>
        <Button className="m-danger">Danger</Button>
      </span>
    ),
    exampleString: '<Button className="m-safe">Safe</Button>\n<Button className="m-notice">Notice</Button>\n<Button className="m-warning">Warning</Button>\n<Button className="m-danger">Danger</Button>'
  }, {
    description: (
      <p>
        Disabled buttons are faded, regardless of there color.
      </p>
    ),
    example: (
      <span>
        <Button
          className="m-primary"
          disabled={true}>Primary</Button>
        <Button
          className="m-safe"
          disabled={true}>Safe</Button>
        <Button
          className="m-warning"
          disabled={true}>Warning</Button>
        <Button
          className="m-danger"
          disabled={true}>Danger</Button>
      </span>
    ),
    exampleString: '<Button\n\tclassName="m-primary"\n\tdisabled={true}>Primary</Button>\n<Button\n\tclassName="m-safe"\n\tdisabled={true}>Safe</Button>\n<Button\n\tclassName="m-warning"\n\tdisabled={true}>Warning</Button>\n<Button\n\tclassName="m-danger"\n\tdisabled={true}>Danger</Button>'
  }, {
    description: (
      <p>
        For a square button, add the <code>m-square</code> class.
      </p>
    ),
    example: (
      <Button className="m-square">Square</Button>
    ),
    exampleString: '<Button className="m-square">Square</Button>'
  }]
};
