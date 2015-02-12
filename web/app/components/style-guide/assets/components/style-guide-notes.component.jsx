var React = require('react/addons');

var StyleGuideNotes = React.createClass({
  render: function() {
    var notes = this.props.notes.map(function(note, key) {
      return (
        <li key={key}>{note}</li>
      )
    });

    return (
      <div className="style-guide__notes">
        <header className="style-guide__section-header">Notes</header>
        <ul>
          {notes}
        </ul>
      </div>
    );
  }
});

module.exports = StyleGuideNotes;
