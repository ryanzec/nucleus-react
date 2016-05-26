import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

import Breadcrumbs from '../../../../assets/components/breadcrumbs.component.jsx';
import Breadcrumb from '../../../../assets/components/breadcrumb.component.jsx';

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

BreadcrumbsPage.displayName = 'BreadcrumbsPage';

BreadcrumbsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BreadcrumbsPage;
