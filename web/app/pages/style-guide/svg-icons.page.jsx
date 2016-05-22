import React from 'react';

import CodeExample from '../../react/components/code-example.component.jsx';

import DefaultExample from './assets/examples/svg-icons/default.jsx';
import StylesExample from './assets/examples/svg-icons/styles.jsx';
import IndicatorsExample from './assets/examples/svg-icons/indicators.jsx';

import { readFileSync } from 'fs';
import { join } from 'path';

const defaultExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/default.jsx'), 'utf8');
const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/styles.jsx'), 'utf8');
const indicatorsExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/indicators.jsx'), 'utf8');

class SvgIconsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-svg-icons">
        <h1>SVG Icons</h1>
        <h4>Default</h4>
        <CodeExample
          exampleComponent={DefaultExample}
          codeContent={defaultExampleContent}
        />
        <h4>Styles</h4>
        <CodeExample
          exampleComponent={StylesExample}
          codeContent={stylesExampleContent}
        />
        <h4>Indicators</h4>
        <CodeExample
          exampleComponent={IndicatorsExample}
          codeContent={indicatorsExampleContent}
        />
      </div>
    );
  }
}

SvgIconsPage.displayName = 'SvgIconsPage';

SvgIconsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default SvgIconsPage;
