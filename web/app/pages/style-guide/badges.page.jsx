import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

import Badge from '../../../../assets/components/badge.component.jsx';

class BadgesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-badges">
        <h1>Badges</h1>
        <h2>Basic</h2>
        <Badge>Default</Badge>
        <Badge styleType="success">Success</Badge>
        <Badge styleType="info">Info</Badge>
        <Badge styleType="warning">Warning</Badge>
        <Badge styleType="danger">Danger</Badge>
        <h2>Pilled</h2>
        <Badge isPill={true}>Default</Badge>
        <Badge isPill={true} styleType="success">Success</Badge>
        <Badge isPill={true} styleType="info">Info</Badge>
        <Badge isPill={true} styleType="warning">Warning</Badge>
        <Badge isPill={true} styleType="danger">Danger</Badge>
        <h2>Thin</h2>
        <Badge isThin={true}>Default</Badge>
        <Badge isThin={true} isPill={true} styleType="success">Success</Badge>
        <Badge isThin={true} styleType="info">Info</Badge>
        <Badge isThin={true} isPill={true} styleType="warning">Warning</Badge>
        <Badge isThin={true} styleType="danger">Danger</Badge>
      </div>
    );
  }
}

BadgesPage.displayName = 'BadgesPage';

BadgesPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BadgesPage;
