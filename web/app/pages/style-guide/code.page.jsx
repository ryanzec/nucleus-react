import React from 'react';

import Code from '../../../../assets/components/code.component.jsx';

const codeContent = 'p {\n\tcolor: red;\n}';

class CodePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-code">
        <h1>Code</h1>
        <Code language="css">
          {codeContent}
        </Code>
        <Code
          language="css"
          showLineNumbers={false}
        >
          {codeContent}
        </Code>
        <Code
          language="css"
          lineNumberStart={-1}
        >
          {codeContent}
        </Code>
        <Code
          language="css"
          highlightLines="1,2-3"
        >
          {codeContent}
        </Code>
      </div>
    );
  }
}

CodePage.displayName = 'CodePage';

CodePage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CodePage;
