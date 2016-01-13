var React = require('react');
var ReactPureRenderMixin = require('react-addons-pure-render-mixin');
var commonReact = require('../../../../assets/index');
var _ = require('lodash');

var menuStore = require('../../stores/menu.store');

var Link = require('react-router').Link;
var Overlay = commonReact.components.Overlay;

var navigationData = [{
  display: 'Nucleus React',
  items: [{
    display: 'Introduction',
    to: '/introduction'
  }, {
    display: 'GitHub',
    href: 'https://github.com/ryanzec/nucleus-react'
  }]
}, {
  display: 'Complex Examples',
  items: [{
    display: 'Forms',
    to: '/complex/forms'
  }]
}, {
  display: 'Foundation',
  items: [{
    display: 'Colors',
    to: '/foundation/colors'
  }, {
    display: 'Grid',
    to: '/foundation/grid'
  }, {
    display: 'Typography',
    to: '/foundation/typography'
  }, {
    display: 'Utility',
    to: '/foundation/utility'
  }, {
    display: 'Validator',
    to: '/foundation/validator'
  }]
}, {
  display: 'Components',
  items: [{
    display: 'Badge',
    to: '/components/badge'
  }, {
    display: 'Button',
    to: '/components/button'
  }, {
    display: 'Calendar',
    to: '/components/calendar'
  }, {
    display: 'Callout',
    to: '/components/callout'
  }, {
    display: 'Card',
    to: '/components/card'
  }, {
    display: 'Character Counter',
    to: '/components/character-counter'
  }, {
    display: 'Checkout Input',
    to: '/components/checkbox-input'
  }, {
    display: 'Code',
    to: '/components/code'
  }, {
    display: 'Confirmation Modal',
    to: '/components/confirmation-modal'
  }, {
    display: 'Date Picker',
    to: '/components/date-picker'
  }, {
    display: 'Drop Down',
    to: '/components/drop-down'
  }, {
    display: 'Extend Text',
    to: '/components/extend-text'
  }, {
    display: 'Form Validation Message',
    to: '/components/form-validation-messages'
  }, {
    display: 'Global Notification',
    to: '/components/global-notification'
  }, {
    display: 'Input Auto Sizer',
    to: '/components/input-auto-sizer'
  }, {
    display: 'Input Group',
    to: '/components/input-group'
  }, {
    display: 'Loading Bar',
    to: '/components/loading-bar'
  }, {
    display: 'Modal',
    to: '/components/modal'
  }, {
    display: 'Overlay',
    to: '/components/overlay'
  }, {
    display: 'Pagination',
    to: '/components/pagination'
  }, {
    display: 'Progress Bar',
    to: '/components/progress-bar'
  }, {
    display: 'Radio Input',
    to: '/components/radio-input'
  }, {
    display: 'Select Input',
    to: '/components/select-input'
  }, {
    display: 'SVG Icon',
    to: '/components/svg-icon'
  }, {
    display: 'Textbox Input',
    to: '/components/textbox-input'
  }]
}, {
  display: 'Mixins',
  items: [{
    display: 'Append Body',
    to: '/mixins/append-body'
  }, {
    display: 'Clickable',
    to: '/mixins/clickable'
  }, {
    display: 'Debounce',
    to: '/mixins/debounce'
  }, {
    display: 'DOM Event Manager',
    to: '/mixins/dom-event-manager'
  }, {
    display: 'Form Input',
    to: '/mixins/form-input'
  }, {
    display: 'Form',
    to: '/mixins/form'
  }, {
    display: 'Pagination',
    to: '/mixins/pagination'
  }, {
    display: 'Single Panel',
    to: '/mixins/single-panel'
  }, {
    display: 'Tooltip',
    to: '/mixins/tooltip'
  }, {
    display: 'Validator',
    to: '/mixins/validator'
  }]
}];

var mainNavigation = {};

mainNavigation.displayName = 'MainNavigation';

mainNavigation.contextTypes = {
  router: React.PropTypes.func
};

mainNavigation.mixins = [
  ReactPureRenderMixin
];

mainNavigation.getInitialState = function() {
  return {
    isActive: menuStore.isActive(),
    activeSection: menuStore.getActiveSection(),
    activeItem: menuStore.getActiveItem()
  };
};

mainNavigation.componentWillMount = function() {
  menuStore.on('changed', this.onMenuStoredChanged);
};

mainNavigation.componentWillUnmount = function() {
  menuStore.removeListener('changed', this.onMenuStoredChanged);
};

mainNavigation.onMenuStoredChanged = function() {
  this.setState({
    isActive: menuStore.isActive(),
    activeSection: menuStore.getActiveSection(),
    activeItem: menuStore.getActiveItem()
  });
};

mainNavigation.generateOnClickNavigation = function(linkType, linkTo) {
  return function(event) {
    event.preventDefault();

    if (linkType === 'internal') {
      this.context.router.transitionTo(linkTo);
    } else {
      window.open(linkTo, '_blank');
    }

    menuStore.deactivate();
  }.bind(this);
};

mainNavigation.renderListItems = function() {
  var listItemsNodes = [];

  navigationData.forEach(function(section, sectionKey) {
    var sectionClassName = 'main-navigation__navigation-item m-primary';

    if (this.state.activeSection === section.display) {
      sectionClassName += ' is-active';
    }

    listItemsNodes.push(
      <li
        key={sectionKey}
        className={sectionClassName}
      >
        {section.display}
      </li>
    );

    section.items.forEach(function(item, itemKey) {
      var itemClassName = 'main-navigation__navigation-item m-secondary';

      if (this.state.activeItem === item.display && this.state.activeSection === section.display) {
        itemClassName += ' is-active';
      }

      var displayNode = item.display;
      var linkType;
      var linkTo;

      if (item.to) {
        linkType = 'internal';
        linkTo = item.to;
      } else if (item.href) {
        linkType = 'external';
        linkTo = item.href;
      }

      listItemsNodes.push(
        <li
          key={sectionKey + '-' + itemKey}
          className={itemClassName}
          onClick={this.generateOnClickNavigation(linkType, linkTo)}
        >
          {item.display}
        </li>
      );
    }.bind(this));
  }.bind(this));

  return listItemsNodes;
};

mainNavigation.render = function() {
  var className = 'main-navigation';

  if (this.state.isActive === true) {
    className += ' is-active';
  }

  return (
    <span>
      <div className={className}>
        <ul className="main-navigation__navigation plain-list">
          {this.renderListItems()}
        </ul>
      </div>
      <Overlay isActive={this.state.isActive} />
    </span>
  );
};

module.exports = React.createClass(mainNavigation);
