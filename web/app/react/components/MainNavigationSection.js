import PropTypes from 'prop-types';
import React from 'react';

import ExpandableList from 'src/components/list/ExpandableList';
import ListItem from 'src/components/list/ListItem';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

class MainNavigationSection extends React.Component {
  getCssClasses() {
    let cssClasses = ['main-navigation__section'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  onClickMenuItem = event => {
    if (event.currentTarget.getAttribute('data-to')) {
      this.context.router.push(event.currentTarget.getAttribute('data-to'));
    }
  };

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
  className: PropTypes.string,
  headerNode: PropTypes.node.isRequired,
  items: PropTypes.array.isRequired
};

MainNavigationSection.contextTypes = {
  router: PropTypes.object
};

MainNavigationSection.defaultProps = {
  className: null,
  headerNode: null,
  items: []
};

export default MainNavigationSection
