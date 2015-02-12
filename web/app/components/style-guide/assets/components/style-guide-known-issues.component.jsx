var React = require('react/addons');

var StyleGuideNotes = React.createClass({
  render: function() {
    var knownIssues = this.props.knownIssues.map(function(knownIssue, key) {
      return (
        <li key={key}>{knownIssue}</li>
      )
    });

    return (
      <div className="style-guide__known-issues">
        <header className="style-guide__section-header">Known Issues</header>
        <ul>
          {knownIssues}
        </ul>
      </div>
    );
  }
});

module.exports = StyleGuideNotes;








