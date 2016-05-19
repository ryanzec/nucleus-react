import React from 'react';
import * as authenticationRepository from '../../repositories/authentication.repository';
import noop from '../../utilities/core/noop';
import {
  formDataFactory,
  helpers as formDataHelpers
} from 'form-data-validation';
import getInputValueFromEvent from '../../../../assets/utilities/input/get-input-value-from-event';
import onChangeInputStateUpdater from '../../../../assets/utilities/input/on-change-input-state-updater';
import onBlurInputStateUpdater from '../../../../assets/utilities/input/on-blur-input-state-updater';

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
        <h1 className="test">Code</h1>
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
