import React from 'react';

import ExpandableList from '../../../../src/components/expandable-list';
import ListItem from '../../../../src/components/list-item';
import SvgIcon from '../../../../src/components/svg-icon';

class MainNavigationSection extends React.Component {
  constructor(props) {
    super(props);

    this.onClickMenuItem = this.onClickMenuItem.bind(this);
  }

  getCssClasses() {
    let cssClasses = ['main-navigation__section'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  onClickMenuItem(event) {
    if (event.currentTarget.getAttribute('data-to')) {
      this.context.router.push(event.currentTarget.getAttribute('data-to'));
    }
  }

  renderItems() {
    var itemNodes = [];

    if (this.props.items.length > 0) {
      this.props.items.forEach((item) => {
        var svgIconNode = null;

        if (item.iconFragment) {
          svgIconNode = (
            <SvgIcon fragment={item.iconFragment} />
          );
        }

        itemNodes.push(
          <ListItem
            key={item.id}
            data-to={item.to}
            onClick={this.onClickMenuItem}
          >
            {svgIconNode}{item.display}
          </ListItem>
        );
      });
    }

    return itemNodes;
  }

  render() {
    return (
      <ExpandableList handleNode={this.props.headerNode}>
        {this.renderItems()}
      </ExpandableList>
    );
  }
}

MainNavigationSection.propTypes = {
  className: React.PropTypes.string,
  headerNode: React.PropTypes.node.isRequired,
  items: React.PropTypes.array.isRequired
};

MainNavigationSection.contextTypes = {
  router: React.PropTypes.object
};

MainNavigationSection.defaultProps = {
  className: null,
  headerNode: null,
  items: []
};

export default MainNavigationSection
