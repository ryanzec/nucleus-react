import React from 'react';
import {connect} from 'react-redux';

import MainNavigation from './main-navigation.component.jsx';
import MainNavigationSection from './main-navigation-section.component.jsx';

class Application extends React.Component {
  constructor(props) {
    super(props);
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
        {this.renderMenu()}
        <div className="main-application">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Application.displayName = 'Application';

let mapStateToProps = function(state) {
  return {
    menu: state.menu.getIn(['menu']).toJS()
  };
};

export default connect(mapStateToProps)(Application);
