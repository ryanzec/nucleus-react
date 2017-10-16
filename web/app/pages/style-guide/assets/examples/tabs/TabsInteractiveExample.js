import PropTypes from 'prop-types';
import React from 'react';

import Tab from 'src/components/tabs/Tabs';
import TabItem from 'src/components/tabs/Tab';

const tabs = [
  'Get Started',
  'Documentation',
  'Community',
  'GitHub',
  'Donate',
];

class TabsInteractiveExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0,
    };
  }

  onClickTab = (event) => {
    this.setState({
      activeTab: parseInt(event.target.getAttribute('data-tab-id'), 10),
    });
  }

  render() {
    return (
      <div className="p-style-guide-tabs">
        <h1>Tabs</h1>
        <Tab>
          {tabs.map((tabName, key) => {
            return (
              <TabItem
                key={key}
                isActive={key === this.state.activeTab}
                data-tab-id={key}
                onClick={this.onClickTab}
              >
                {tabName}
              </TabItem>
            );
          })}
        </Tab>
        <br />
        <Tab styleType="block">
          {tabs.map((tabName, key) => {
            return (
              <TabItem
                key={key}
                isActive={key === this.state.activeTab}
                data-tab-id={key}
                onClick={this.onClickTab}
              >
                {tabName}
              </TabItem>
            );
          })}
        </Tab>
      </div>
    );
  }
}

TabsInteractiveExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default TabsInteractiveExample;
