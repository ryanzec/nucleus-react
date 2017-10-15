import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from '../../react/components/code-example';

import DefaultExample from './assets/examples/svg-icons/default';
import StylesExample from './assets/examples/svg-icons/styles';
import IndicatorsExample from './assets/examples/svg-icons/indicators';

import { readFileSync } from 'fs';
import { join } from 'path';

const defaultExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/default.js'), 'utf8');
const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/styles.js'), 'utf8');
const indicatorsExampleContent = readFileSync(join(__dirname, '/assets/examples/svg-icons/indicators.js'), 'utf8');

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

SvgIconsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default SvgIconsPage;
