var React = require('react/addons');
var nucleusReact = require('../../../../assets/index');
var Svg = nucleusReact.svg.components.Svg;
var Link = require('react-router').Link;

var Header = React.createClass({
  render: function() {
    return (
      <header className="fixed-wrapper">
        <div className="application-header">
          <ul className="plain-list">
            <li><a href="https://github.com/ryanzec/coding-standards" target="_blank">Coding Standards</a></li>
            <li><Link to="home">UI Components</Link></li>
            <li><a href="https://github.com/ryanzec/nucleus-react" target="_blank">About Nucleus React</a></li>
          </ul>
        </div>
      </header>
    );
  }
});

module.exports = Header;
