var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var ProgressBar = nucleusReact.progressBar.components.ProgressBar;

module.exports = {
  name: 'Progress Bar',
  type: 'component',
  overview: (
    <p>
      Progress bar.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'className',
    defaultValue: 'null',
    description: 'CSS classes to add to the pill.'
  }, {
    type: 'object',
    name: 'style',
    defaultValue: '{}',
    description: 'Object of styles to apply to main element.'
  }, {
    type: 'number',
    name: 'percentageDone',
    defaultValue: '0',
    description: 'Percentage of the pbar to fill.'
  }],
  examples: [{
    description: (
      <p>
        Standard empty progress bar.
      </p>
    ),
    example: (
      <ProgressBar style={{width: '100px'}} />
    ),
    exampleString: '<ProgressBar style={{width: \'100px\'}} />'
  }, {
    description: (
      <p>
        Set the fill portion with a value of <code>1</code> through <code>100</code> for the <code>percentageDone</code> property.
      </p>
    ),
    example: (
      <ProgressBar style={{width: '100px'}} percentageDone={70} />
    ),
    exampleString: '<ProgressBar style={{width: \'100px\'}} percentageDone={70} />'
  }, {
    description: (
      <p>
        Progress bars support different colors with the <code>m-safe</code>, <code>m-notice</code>, <code>m-warning</code>, and <code>m-danger</code> classes.
      </p>
    ),
    example: (
      <span>
        <ProgressBar style={{width: '100px'}} className="m-safe" percentageDone={25} />
        <ProgressBar style={{width: '100px'}} className="m-notice" percentageDone={50} />
        <ProgressBar style={{width: '100px'}} className="m-warning" percentageDone={75} />
        <ProgressBar style={{width: '100px'}} className="m-danger" percentageDone={100} />
      </span>
    ),
    exampleString: '<ProgressBar style={{width: \'100px\'}} className="m-safe" percentageDone={25} />\n<ProgressBar style={{width: \'100px\'}} className="m-notice" percentageDone={50} />\n<ProgressBar style={{width: \'100px\'}} className="m-warning" percentageDone={75} />\n<ProgressBar style={{width: \'100px\'}} className="m-danger" percentageDone={100} />'
  }]
};
