var React = require('react/addons');
var nucleusReact = require('../../../../../assets/index');
var Code = nucleusReact.code.components.Code;
var codeContent = 'p {\n\tcolor: red;\n}';

module.exports = {
  name: 'Code',
  type: 'component',
  overview: (
    <p>
      The code component allows you to display code using the Prism syntax highlighter.
    </p>
  ),
  properties: [{
    type: 'string',
    name: 'language',
    defaultValue: 'null',
    description: (
      <div>
        <p>The language of the code example.</p>
      </div>
    ),
    validValues: [
      'css',
      'markup',
      'javascript',
      'java',
      'php',
      'scss',
      'python',
      'sql',
      'ruby',
      'csharp',
      'go',
      'scala',
      'haskell',
      'swift',
      'ini',
      'git',
      'scheme',
      'perl',
      'less',
      'erlang',
      'latex'
    ]
  }, {
    type: 'boolean',
    name: 'showLineNumbers',
    defaultValue: 'true',
    description: 'Whether or not to show the line numbers.'
  }, {
    type: 'string',
    name: 'lineNumberStart',
    defaultValue: 'null',
    description: 'If showLineNumbers is set to true, this can allow you to set the starting line number to something other than 1.  If showLineNumbers is set to true, this can allow you to set the starting line number to something other than 1.  If showLineNumbers is set to true, this can allow you to set the starting line number to something other than 1.  If showLineNumbers is set to true, this can allow you to set the starting line number to something other than 1.  If showLineNumbers is set to true, this can allow you to set the starting line number to something other than 1.'
  }, {
    type: 'string',
    name: 'highlightLines',
    defaultValue: 'null',
    description: 'One or more sets of line numbers to highlight.'
  }],
  examples: [{
    description: 'Standard',
    example: (
      <Code language="css">{codeContent}</Code>
    ),
    exampleString: '<Code language="css">{codeContent}</Code>'
  }, {
    description: 'Hiding line numbers',
    example: (
      <Code
        language="css"
        showLineNumbers={false}>{codeContent}</Code>
    ),
    exampleString: '<Code\n  language="css"\n  showLineNumbers={false}>{codeContent}</Code>'
  }, {
    description: 'Specificing a starting line number',
    example: (
      <Code
        language="css"
        lineNumberStart={-1}>{codeContent}</Code>
    ),
    exampleString: '<Code\n  language="css"\n  lineNumberStart={-1}>{codeContent}</Code>'
  }, {
    description: 'Highlighting lines',
    example: (
      <Code
        language="css"
        highlightLines="1,2-3">{codeContent}</Code>
    ),
    exampleString: '<Code\n  language="css"\n  highlightLines="1,2-3">{codeContent}</Code>'
  }],
  notes: [
    (
      <span>This has a few modifications to the default Prism code in order to make some of the plugins work properly together.</span>
    )
  ],
  knownIssues: [
    (
      <span>
        Line hightlight and not showing the line numbers has styling issues
        <Code
          language="css"
          showLineNumbers={false}
          highlightLines="1,2-3">{codeContent}</Code>
      </span>
    )
  ]
};
