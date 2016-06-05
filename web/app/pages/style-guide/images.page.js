import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './assets/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles'), 'utf8');

import Button from '../../../../src/components/button';
import Image from '../../../../src/components/image';

class ImagesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-images">
        <h1>Images</h1>
        <h2>Valid Image</h2>
        <Image src="/build/images/user.png" notFoundNode="Test" />
        <h2>Invalid Image</h2>
        <Image src="/build/images/nonono.png" notFoundNode="Test" />
        <Image src="/build/images/nonono.png" notFoundNode={<Button>Any renderable node can be used</Button>} />
      </div>
    );
  }
}

ImagesPage.displayName = 'ImagesPage';

ImagesPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ImagesPage;
