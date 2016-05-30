import React from 'react';
import pureRenderShouldComponentUpdate from '../../../../assets/utilities/pure-render-should-component-update';

import Code from '../../../../assets/components/code.component.jsx';
import Card from '../../../../assets/components/card.component.jsx';
import CardContent from '../../../../assets/components/card-content.component.jsx';
import Button from '../../../../assets/components/button.component.jsx';

class CodeExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        displayCodeExample: false
    };

    this.onClickToggleCodeExample = this.onClickToggleCodeExample.bind(this);
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

  onClickToggleCodeExample() {
    this.setState({
        displayCodeExample: !this.state.displayCodeExample
    })
  }

  render() {
    const ExampleComponent = this.props.exampleComponent;
    let codeExampleNode = null;

    if (this.state.displayCodeExample) {
        codeExampleNode = (
            <Code language={this.props.language}>
                {this.props.codeContent}
            </Code>
        )
    }

    return (
      <Card className={this.getCssClasses().join(' ')}>
        <CardContent>
          <div>
            <ExampleComponent />
          </div>
          <Button
              styleType="link"
              onClick={this.onClickToggleCodeExample}
          >
              Toggle Code Example
          </Button>
          {codeExampleNode}
        </CardContent>
      </Card>
    );
  }
}

CodeExample.displayName = 'CodeExample';

CodeExample.propTypes = {
  className: React.PropTypes.string,
  exampleComponent: React.PropTypes.func.isRequired,
  codeContent: React.PropTypes.string.isRequired,
  language: React.PropTypes.string
};

CodeExample.defaultProps = {
  className: null,
  exampleComponent: null,
  codeContent: null,
  language: 'jsx'
};

export default CodeExample;
