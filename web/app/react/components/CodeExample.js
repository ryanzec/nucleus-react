import PropTypes from 'prop-types';
import React from 'react';

import Code from 'src/components/code/Code';
import Card from 'src/components/card/Card';
import CardContent from 'src/components/card/CardContent';
import Button from 'src/components/button/Button';

class CodeExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      displayCodeExample: false
    };
  }

  getCssClasses() {
    let cssClasses = ['code-example'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  onClickToggleCodeExample = () => {
    this.setState({
      displayCodeExample: !this.state.displayCodeExample
    })
  };

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

CodeExample.propTypes = {
  className: PropTypes.string,
  exampleComponent: PropTypes.func.isRequired,
  codeContent: PropTypes.string.isRequired,
  language: PropTypes.string
};

CodeExample.defaultProps = {
  className: null,
  exampleComponent: null,
  codeContent: null,
  language: 'jsx'
};

export default CodeExample;
