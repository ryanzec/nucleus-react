var React = require('react/addons');
var StyleGuideOverview = require('./style-guide-overview.component.jsx');
var StyleGuideProvidedMethods = require('./style-guide-provided-methods.component.jsx');
var StyleGuideProvidableMethods = require('./style-guide-providable-methods.component.jsx');
var StyleGuideActions = require('./style-guide-actions.component.jsx');
var StyleGuideProperties = require('./style-guide-properties.component.jsx');
var StyleGuideExamples = require('./style-guide-examples.component.jsx');
var StyleGuideNotes = require('./style-guide-notes.component.jsx');
var StyleGuideKnownIssues = require('./style-guide-known-issues.component.jsx');
var nucleusReact = require('../../../../../../assets/index');
var Badge = nucleusReact.components.Badge;

var StyleGuideTemplate = React.createClass({
  render: function() {
    var providedMethods = this.props.data.providedMethods ? <StyleGuideProvidedMethods providedMethods={this.props.data.providedMethods} /> : '';
    var providableMethods = this.props.data.providableMethods ? <StyleGuideProvidableMethods providableMethods={this.props.data.providableMethods} /> : '';
    var actions = this.props.data.actions ? <StyleGuideActions actions={this.props.data.actions} /> : '';
    var properties = this.props.data.properties ? <StyleGuideProperties properties={this.props.data.properties} /> : '';
    var examples = this.props.data.examples ? <StyleGuideExamples examples={this.props.data.examples} /> : '';
    var notes = this.props.data.notes ? <StyleGuideNotes notes={this.props.data.notes} /> : '';
    var knownIssues = this.props.data.knownIssues ? <StyleGuideKnownIssues knownIssues={this.props.data.knownIssues} /> : '';

    return (
      <span>
        <h1>{this.props.data.name} <Badge>{this.props.data.type}</Badge></h1>
        <StyleGuideOverview description={this.props.data.overview} />
        {notes}
        {properties}
        {providedMethods}
        {providableMethods}
        {actions}
        {examples}
        {knownIssues}
      </span>
    );
  }
});

module.exports = StyleGuideTemplate;
