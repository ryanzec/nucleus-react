import React from 'react';

import CodeExample from '../../react/components/code-example.component.jsx';

import ProgressBar from '../../../../assets/components/progress-bar.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

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
        <ProgressBar value={25} className="margin-bottom-10" />
        <ProgressBar value={50} className="margin-bottom-10" />
        <ProgressBar value={75} className="margin-bottom-10" />
        <ProgressBar value={100} className="margin-bottom-10" />
        <h2>Styles</h2>
        <ProgressBar styleType="success" value={25} className="margin-bottom-10" />
        <ProgressBar styleType="info" value={50} className="margin-bottom-10" />
        <ProgressBar styleType="warning" value={75} className="margin-bottom-10" />
        <ProgressBar styleType="danger" value={100} className="margin-bottom-10" />
        <h2>Striped</h2>
        <ProgressBar styleType="success" isStriped={true} value={25} className="margin-bottom-10" />
        <ProgressBar styleType="info" isStriped={true} value={50} className="margin-bottom-10" />
        <ProgressBar styleType="warning" isStriped={true} value={75} className="margin-bottom-10" />
        <ProgressBar styleType="danger" isStriped={true} value={100} className="margin-bottom-10" />
      </div>
    );
  }
}

ProgressBarsPage.displayName = 'ProgressBarsPage';

ProgressBarsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ProgressBarsPage;
