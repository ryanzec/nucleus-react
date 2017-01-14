import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import Breadcrumbs from '../../../../src/components/breadcrumbs';
import Breadcrumb from '../../../../src/components/breadcrumb';

class BreadcrumbsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-breadcrumbs">
        <h1>Breadcrumbs</h1>
        <Breadcrumbs>
          <Breadcrumb onClick={() => {console.log('1');}}>One</Breadcrumb>
          <Breadcrumb onClick={() => {console.log('2');}}>Two</Breadcrumb>
          <Breadcrumb onClick={() => {console.log('3');}}>Three</Breadcrumb>
          <Breadcrumb isActive={true}>Four</Breadcrumb>
        </Breadcrumbs>
      </div>
    );
  }
}

BreadcrumbsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BreadcrumbsPage;
