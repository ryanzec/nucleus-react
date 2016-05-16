import React from 'react';

import SvgIcon from '../../../../assets/components/svg-icon.component.jsx';

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
    var itemsNode = null;
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
          <div
            key={item.id}
            className="main-navigation__item"
            data-to={item.to}
            onClick={this.onClickMenuItem}
          >
            {svgIconNode}{item.display}
          </div>
        );
      });

      itemsNode = (
        <div className="main-navigation__items">
          {itemNodes}
        </div>
      );
    }

    return itemsNode;
  }

  render() {
    return (
      <div className={this.getCssClasses().join(' ')}>
        <div className="main-navigation__section-header">{this.props.headerNode}</div>
        {this.renderItems()}
      </div>
    );
  }
}

MainNavigationSection.displayName = 'MainNavigationSection';

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
