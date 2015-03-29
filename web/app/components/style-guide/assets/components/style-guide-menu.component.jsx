var React = require('react/addons');
var Link = require('react-router').Link;
var nucleusReact = require('../../../../../../assets/index');
var Badge = nucleusReact.components.Badge;
var Modal = nucleusReact.components.Modal;

var StyleGuideMenu = React.createClass({
  getInitialState: function() {
    return {
      isComponentModalActive: false
    };
  },

  showComponentsModal: function() {
    this.setState({
      isComponentModalActive: true
    });
  },

  hideComponentsModal: function() {
    this.setState({
      isComponentModalActive: false
    });
  },

  render: function() {
    return (
      <span>
        <div className="style-guide__menu m-expanded u-hide-small">
          <ul className="plain-list expanded-view">
            <li><Link to="append-body">Append Body <Badge>mixin</Badge></Link></li>
            <li><Link to="badge">Badge <Badge>component</Badge></Link></li>
            <li><Link to="button">Button <Badge>component</Badge></Link></li>
            <li><Link to="callout">Callout <Badge>component</Badge></Link></li>
            <li><Link to="card">Card <Badge>component</Badge></Link></li>
            <li><Link to="code">Code <Badge>component</Badge></Link></li>
            <li><Link to="character-counter">Character Counter <Badge>component</Badge></Link></li>
            <li><Link to="date-picker">Date Picker <Badge>component</Badge></Link></li>
            <li><Link to="debounce">Debounce <Badge>mixin</Badge></Link></li>
            <li><Link to="dom-event-manager">DOM Event Manager <Badge>mixin</Badge></Link></li>
            <li><Link to="extend-text">Extend Text <Badge>component</Badge></Link></li>
            <li><Link to="flexbox-grid">Flexbox Grid<Badge>component</Badge></Link></li>
            <li><Link to="form">Form <Badge>component</Badge></Link></li>
            <li><Link to="input-auto-sizer">Input Auto Sizer <Badge>component</Badge></Link></li>
            <li><Link to="modal">Modal <Badge>component</Badge></Link></li>
            <li><Link to="overlay">Overlay <Badge>component</Badge></Link></li>
            <li><Link to="pagination">Pagination <Badge>component</Badge></Link></li>
            <li><Link to="pagination-mixin">Pagination <Badge>mixin</Badge></Link></li>
            <li><Link to="progress-bar">Progress Bar <Badge>component</Badge></Link></li>
            <li><Link to="single-panel">Single Panel <Badge>store</Badge></Link></li>
            <li><Link to="svg-icon">Svg Icon <Badge>component</Badge></Link></li>
            <li><Link to="tooltip">Tooltip <Badge>mixin</Badge></Link></li>
          </ul>
        </div>
        <div className="style-guide__menu m-minified u-hide-medium u-hide-large u-hide-extra-large">
          <button onClick={this.showComponentsModal}>Components</button>
          <Modal isActive={this.state.isComponentModalActive}>
            <ul onClick={this.hideComponentsModal} className="plain-list">
              <li><Link to="home">Overview</Link></li>
              <li><Link to="append-body"><Badge>m</Badge>Append Body</Link></li>
              <li><Link to="badge"><Badge>c</Badge>Badge</Link></li>
              <li><Link to="button"><Badge>c</Badge>Button</Link></li>
              <li><Link to="callout"><Badge>c</Badge>Callout</Link></li>
              <li><Link to="card"><Badge>c</Badge>Card</Link></li>
              <li><Link to="code"><Badge>c</Badge>Code</Link></li>
              <li><Link to="character-counter"><Badge>c</Badge>Character Counter</Link></li>
              <li><Link to="date-picker"><Badge>c</Badge>Date Picker</Link></li>
              <li><Link to="debounce"><Badge>m</Badge>Debounce</Link></li>
              <li><Link to="dom-event-manager"><Badge>m</Badge>DOM Event Manager</Link></li>
              <li><Link to="extend-text"><Badge>c</Badge>Extend Text</Link></li>
              <li><Link to="form"><Badge>c</Badge>Form</Link></li>
              <li><Link to="flexbox-grid"><Badge>c</Badge>Flexbox Grid</Link></li>
              <li><Link to="input-auto-sizer"><Badge>c</Badge>Input Auto Sizer</Link></li>
              <li><Link to="modal"><Badge>c</Badge>Modal</Link></li>
              <li><Link to="overlay"><Badge>c</Badge>Overlay</Link></li>
              <li><Link to="pagination"><Badge>c</Badge>Pagination</Link></li>
              <li><Link to="pagination-mixin"><Badge>m</Badge>Pagination</Link></li>
              <li><Link to="progress-bar"><Badge>c</Badge>Progress Bar</Link></li>
              <li><Link to="single-panel"><Badge>s</Badge>Single Panel</Link></li>
              <li><Link to="svg-icon"><Badge>c</Badge>Svg Icon</Link></li>
              <li><Link to="tooltip"><Badge>m</Badge>Tooltip</Link></li>
            </ul>
          </Modal>
        </div>
      </span>
    );
  }
});

module.exports = StyleGuideMenu;
