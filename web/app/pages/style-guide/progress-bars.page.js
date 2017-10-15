import PropTypes from 'prop-types';
import React from 'react';

import CodeExample from '../../react/components/code-example';

import ProgressBar from '../../../../src/components/progress-bar';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

class ProgressBarsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-progress-bars">
        <h1>Progress Bars</h1>
        <h2>Default</h2>
        <ProgressBar value={25} className="u-margin-bottom-12" />
        <ProgressBar value={50} className="u-margin-bottom-12" />
        <ProgressBar value={75} className="u-margin-bottom-12" />
        <ProgressBar value={100} className="u-margin-bottom-12" />
        <h2>Styles</h2>
        <ProgressBar styleType="success" value={25} className="u-margin-bottom-12" />
        <ProgressBar styleType="info" value={50} className="u-margin-bottom-12" />
        <ProgressBar styleType="warning" value={75} className="u-margin-bottom-12" />
        <ProgressBar styleType="danger" value={100} className="u-margin-bottom-12" />
        <h2>Striped</h2>
        <ProgressBar styleType="success" isStriped={true} value={25} className="u-margin-bottom-12" />
        <ProgressBar styleType="info" isStriped={true} value={50} className="u-margin-bottom-12" />
        <ProgressBar styleType="warning" isStriped={true} value={75} className="u-margin-bottom-12" />
        <ProgressBar styleType="danger" isStriped={true} value={100} className="u-margin-bottom-12" />
        <h2>Square</h2>
        <ProgressBar isSquare styleType="success" isStriped={true} value={25} className="u-margin-bottom-12" />
        <ProgressBar isSquare styleType="info" isStriped={true} value={50} className="u-margin-bottom-12" />
        <ProgressBar isSquare styleType="warning" isStriped={true} value={75} className="u-margin-bottom-12" />
        <ProgressBar isSquare styleType="danger" isStriped={true} value={100} className="u-margin-bottom-12" />
      </div>
    );
  }
}

ProgressBarsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ProgressBarsPage;
