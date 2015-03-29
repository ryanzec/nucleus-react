var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Callout = nucleusReact.components.Callout;

module.exports = {
  name: 'Callout',
  type: 'component',
  overview: (
    <p>
      Component to call out a block of content.
    </p>
  ),
  properties: [],
  examples: [{
    description: (
      <p>
        Standard button.
      </p>
    ),
    example: (
      <Callout headerText="Callout Header">
        This is information that we want to call out.
      </Callout>
    ),
    exampleString: '<Callout headerText="Callout Header">\n\tThis is information that we want to call out.\n</Callout>'
  }, {
    description: (
      <p>
        The header text can be omitted.
      </p>
    ),
    example: (
      <Callout>
        This is information that we want to call out without a header.
      </Callout>
    ),
    exampleString: '<Callout>\n\tThis is information that we want to call out without a header.\n</Callout>'
  }, {
    description: (
      <p>
        You can also provide colors with the <code>m-safe</code>, <code>m-notice</code>, <code>m-warning</code>, and <code>m-danger</code> classes.
      </p>
    ),
    example: (
      <span>
        <Callout className="m-safe" headerText="Callout Header">
          This is information that we want to call out.
        </Callout>
        <Callout className="m-notice" headerText="Callout Header">
          This is information that we want to call out.
        </Callout>
        <Callout className="m-warning" headerText="Callout Header">
          This is information that we want to call out.
        </Callout>
        <Callout className="m-danger" headerText="Callout Header">
          This is information that we want to call out.
        </Callout>
      </span>
    ),
    exampleString: '<Callout>\n\tThis is information that we want to call out without a header.\n</Callout>'
  }]
};
