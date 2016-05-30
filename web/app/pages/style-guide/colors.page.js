import React from 'react';

import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

class ButtonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-colors">
        <h1>Color</h1>
      </div>
    );
  }
}

ButtonsPage.displayName = 'ButtonsPage';

ButtonsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ButtonsPage;
