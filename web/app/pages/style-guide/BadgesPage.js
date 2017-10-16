import PropTypes from 'prop-types';
import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './assets/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles'), 'utf8');

import Badge from 'src/components/badge/Badge';

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
        <Badge isPill={true}>1</Badge>
        <Badge isPill={true} styleType="success">23</Badge>
        <Badge isPill={true} styleType="info">143</Badge>
        <Badge isPill={true} styleType="warning">23</Badge>
        <Badge isPill={true} styleType="danger">2</Badge>
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

BadgesPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BadgesPage;
