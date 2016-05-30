import React from 'react';

// import CodeExample from '../../react/components/code-example.component.jsx';

// import StylesExample from './assets/examples/buttons/styles.jsx';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/assets/examples/buttons/styles.jsx'), 'utf8');

// import Badge from '../../../../assets/components/badge.component.jsx';

class BadgesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-lists">
        <h1>Lists</h1>
        <h2>Ordered</h2>
        <ol>
          <li>ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit amet, adipiscing</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
        </ol>
        <h2>Unordered</h2>
        <ul>
          <li>ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit amet, adipiscing</li>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
        </ul>
        <h2>Nested</h2>
        <ul>
          <li>ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit amet, adipiscing</li>
          <ul>
            <li>ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum sit amet, consectetur adipiscing</li>
            <ul>
              <li>ipsum dolor sit amet, consectetur adipiscing</li>
              <li>Lorem ipsum dolor sit amet, adipiscing</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
              <li>Lorem ipsum sit amet, consectetur adipiscing</li>
              <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
              <li>Lorem ipsum dolor sit amet, consectetur</li>
            </ul>
            <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur</li>
          </ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum sit amet, consectetur adipiscing</li>
          <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
          <ul>
            <li>ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum sit amet, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit, consectetur adipiscing</li>
            <li>Lorem ipsum dolor sit amet, consectetur</li>
          </ul>
          <li>Lorem ipsum dolor sit amet, consectetur</li>
        </ul>
      </div>
    );
  }
}

BadgesPage.displayName = 'BadgesPage';

BadgesPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default BadgesPage;
