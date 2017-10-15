import PropTypes from 'prop-types';
import React from 'react';

// import CodeExample from '../../react/components/code-example';

// import StylesExample from './src/examples/buttons/styles';

// import { readFileSync } from 'fs';
// import { join } from 'path';

// const stylesExampleContent = readFileSync(join(__dirname, '/src/examples/buttons/styles'), 'utf8');

import List from '../../../../src/components/list/List';
import ListItem from '../../../../src/components/list/ListItem';
import ExpandableList from '../../../../src/components/list/ExpandableList';

class BadgesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="p-style-guide-lists">
        <h1>Lists</h1>
        <h2>Plain List</h2>
        <List styleType="plain">
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <List styleType="plain">
            <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
            <List styleType="plain">
              <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
            </List>
            <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
          </List>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <List styleType="plain">
            <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
          </List>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
        </List>
        <h2>Expandable List</h2>
        <ExpandableList
          handleNode="Toggle List"
        >
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
        </ExpandableList>
        <h2>Ordered</h2>
        <List type="ol">
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
        </List>
        <h2>Unordered</h2>
        <List>
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
        </List>
        <h2>Nested</h2>
        <List>
          <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
          <List>
            <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
            <List>
              <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
              <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
            </List>
            <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
          </List>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
          <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
          <List>
            <ListItem>ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum sit amet, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit, consectetur adipiscing</ListItem>
            <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
          </List>
          <ListItem>Lorem ipsum dolor sit amet, consectetur</ListItem>
        </List>
      </div>
    );
  }
}

BadgesPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default BadgesPage;
