import React from 'react';

import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

class CardsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-typography">
        <h1>Typography</h1>
        <h2>Headers</h2>
        <div>
          <h1>Header 1</h1>
          <h2>Header 2</h2>
          <h3>Header 3</h3>
          <h4>Header 4</h4>
          <h5>Header 5</h5>
          <h6>Header 6</h6>
        </div>
        <h2>Links</h2>
        <a href="#">Link</a>
        <h2>Paragraphs</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium odio vel hendrerit congue. Integer mollis leo nec pharetra dictum. Donec gravida pulvinar euismod. In vitae magna et ligula egestas vulputate et vitae tellus. Mauris nisl magna, congue ut felis et, tincidunt lobortis sapien. Praesent nec metus eget ex feugiat.</p>
      </div>
    );
  }
}

CardsPage.displayName = 'CardsPage';

CardsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default CardsPage;
