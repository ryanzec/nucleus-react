import React from 'react';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

import Tab from '../../../../src/components/tabs/Tabs';
import TabItem from '../../../../src/components/tabs/Tab';

import MainNavigation from './main-navigation';
import MainNavigationSection from './main-navigation-section';

class Application extends React.Component {
  onClickGitHub = () => {
    window.open('https://github.com/ryanzec/nucleus-react', '_blank');
  }

  renderHeader() {
    return (
      <div className="application-container__header">
        <div className="application-container__header-logo">
          Nucleus React
        </div>
        <div>
          <Tab styleType="block">
            <TabItem isActive>Documentation</TabItem>
            <TabItem onClick={this.onClickGitHub}>GitHub</TabItem>
          </Tab>
        </div>
      </div>
    );
  }

  renderContent() {
    return (
      <div className="application-container__main-content">
        {this.props.children}
      </div>
    );
  }

  renderMenu() {
    var menuNode = null;
    var menuSectionNodes = [];

    if (this.props.menu.length > 0) {
      this.props.menu.forEach(function(menuSection, key) {
        menuSectionNodes.push(
          <MainNavigationSection
            key={key}
            headerNode={menuSection.display}
            items={menuSection.items}
          />
        );
      });

      var menuNode = (
        <MainNavigation>
          {menuSectionNodes}
        </MainNavigation>
      );
    }

    return menuNode;
  }

  render() {
    return (
      <div className="application-container">
        {this.renderHeader()}
        <div className="application-container__main">
          {this.renderMenu()}
          {this.renderContent()}
        </div>
      </div>
    );
  }
}

let mapStateToProps = function(state) {
  return {
    menu: state.menu.getIn(['menu']).toJS()
  };
};

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Application));
