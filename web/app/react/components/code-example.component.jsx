import React from 'react';
import pureRenderShouldComponentUpdate from '../../../../assets/utilities/pure-render-should-component-update';

import Code from '../../../../assets/components/code.component.jsx';

class CodeExample extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['code-example'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    const ExampleComponent = this.props.exampleComponent;

    return (
      <div className={this.getCssClasses().join(' ')}>
        <ExampleComponent />
        <Code language="jsx">
          {this.props.codeContent}
        </Code>
      </div>
    );
  }
}

CodeExample.displayName = 'CodeExample';

CodeExample.propTypes = {
  className: React.PropTypes.string,
  exampleComponent: React.PropTypes.func.isRequired,
  codeContent: React.PropTypes.string.isRequired,
};

CodeExample.defaultProps = {
  className: null,
  exampleComponent: null,
  codeContent: null
};

export default CodeExample;
