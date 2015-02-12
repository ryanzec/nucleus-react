var React = require('react/addons');

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
      <button>Standard</button>
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
        <button className="m-safe">Safe</button>
        <button className="m-notice">Notice</button>
        <button className="m-warning">Warning</button>
        <button className="m-danger">Danger</button>
      </span>
    ),
    exampleString: '<button className="m-safe">Safe</button>\n<button className="m-notice">Notice</button>\n<button className="m-warning">Warning</button>\n<button className="m-danger">Danger</button>'
  }, {
    description: (
      <p>
        Disabled buttons are faded, regardless of there color.
      </p>
    ),
    example: (
      <span>
        <button
          className="m-primary"
          disabled={true}>Primary</button>
        <button
          className="m-safe"
          disabled={true}>Safe</button>
        <button
          className="m-warning"
          disabled={true}>Warning</button>
        <button
          className="m-danger"
          disabled={true}>Danger</button>
      </span>
    ),
    exampleString: '<button\n\tclassName="m-primary"\n\tdisabled={true}>Primary</button>\n<button\n\tclassName="m-safe"\n\tdisabled={true}>Safe</button>\n<button\n\tclassName="m-warning"\n\tdisabled={true}>Warning</button>\n<button\n\tclassName="m-danger"\n\tdisabled={true}>Danger</button>'
  }, {
    description: (
      <p>
        For a square button, add the <code>m-square</code> class.
      </p>
    ),
    example: (
      <button className="m-square">Square</button>
    ),
    exampleString: '<button className="m-square">Square</button>'
  }, {
    description: (
      <p>
        In addition to the standard size, there are 3 other sized button using the <code>m-small</code>, <code>m-large</code>, and <code>m-largest</code> classes.
      </p>
    ),
    example: (
      <span>
        <button className="m-small">Small</button>
        <button>Standard</button>
        <button className="m-large">Large</button>
        <button className="m-largest">Largest</button>
      </span>
    ),
    exampleString: '<button className="m-small">Small</button>\n<button>Standard</button>\n<button className="m-large">Large</button>\n<button className="m-largest">Largest</button>'
  }]
};
