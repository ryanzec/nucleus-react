import PropTypes from 'prop-types';
import React from 'react';

import { pureRenderShouldComponentUpdate } from '../../../../src/utilities/component';

import Code from '../../../../src/components/code';
import Card from '../../../../src/components/card';
import CardContent from '../../../../src/components/card-content';
import Button from '../../../../src/components/button';

class CodeExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        displayCodeExample: false
    };
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
