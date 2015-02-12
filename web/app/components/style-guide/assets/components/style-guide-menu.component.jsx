var React = require('react/addons');
var Link = require('react-router').Link;
var nucleusReact = require('../../../../../../assets/index');
var Badge = nucleusReact.badge.components.Badge;
var Modal = nucleusReact.modal.components.Modal;

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
        <div className="style-guide__menu m-expanded">
          <ul className="plain-list expanded-view">
            <li><Link to="append-body">Append Body <Badge>mixin</Badge></Link></li>
            <li><Link to="badge">Badge <Badge>component</Badge></Link></li>
            <li><Link to="button">Button <Badge>css component</Badge></Link></li>
            <li><Link to="code">Code <Badge>component</Badge></Link></li>
            <li><Link to="debounce">Debounce <Badge>mixin</Badge></Link></li>
            <li><Link to="dom-event-manager">DOM Event Manager <Badge>mixin</Badge></Link></li>
            <li><Link to="extend-text">Extend Text <Badge>component</Badge></Link></li>
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
        <div className="style-guide__menu m-minified">
          <button onClick={this.showComponentsModal}>Components</button>
          <Modal isActive={this.state.isComponentModalActive}>
            <ul onClick={this.hideComponentsModal} className="plain-list">
              <li><Link to="append-body">Append Body</Link></li>
              <li><Link to="badge">Badge</Link></li>
              <li><Link to="button">Button</Link></li>
              <li><Link to="code">Code</Link></li>
              <li><Link to="debounce">Debounce</Link></li>
              <li><Link to="dom-event-manager">DOM Event Manager</Link></li>
              <li><Link to="extend-text">Extend Text</Link></li>
              <li><Link to="modal">Modal</Link></li>
              <li><Link to="overlay">Overlay</Link></li>
              <li><Link to="home">Overview</Link></li>
              <li><Link to="pagination">Pagination</Link></li>
              <li><Link to="pagination-mixin">Pagination</Link></li>
              <li><Link to="progress-bar">Progress Bar</Link></li>
              <li><Link to="single-panel">Single Panel</Link></li>
              <li><Link to="svg-icon">Svg Icon</Link></li>
              <li><Link to="tooltip">Tooltip</Link></li>
            </ul>
          </Modal>
        </div>
      </span>
    );
  }
});

module.exports = StyleGuideMenu;
