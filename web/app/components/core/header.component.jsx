var React = require('react/addons');
var nucleusReact = require('../../../../assets/index');
var Link = require('react-router').Link;
var FlexRow = nucleusReact.components.FlexRow;
var FlexCell = nucleusReact.components.FlexCell;

var Header = React.createClass({
  render: function() {
    return (
      <header className="fixed-wrapper">
          <FlexRow className="application-header" alignItems="center">
            <FlexCell>
              <ul className="plain-list">
                <li><a href="https://github.com/ryanzec/coding-standards" target="_blank">Coding Standards</a></li>
                <li><Link to="home">UI Components</Link></li>
                <li><a href="https://github.com/ryanzec/nucleus-react" target="_blank">About Nucleus React</a></li>
              </ul>
            </FlexCell>
          </FlexRow>
      </header>
    );
  }
});

module.exports = Header;
