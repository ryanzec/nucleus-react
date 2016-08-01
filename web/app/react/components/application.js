import React from 'react';
import {connect} from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

import Grid from '../../../../src/components/grid';
import GridRow from '../../../../src/components/grid-row';
import GridColumn from '../../../../src/components/grid-column';

import MainNavigation from './main-navigation';
import MainNavigationSection from './main-navigation-section';

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
        <Grid>
          <GridRow>
            <GridColumn>
              <div className="main-application">
                {this.props.children}
              </div>
            </GridColumn>
          </GridRow>
        </Grid>
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

export default DragDropContext(HTML5Backend)(connect(mapStateToProps)(Application));
