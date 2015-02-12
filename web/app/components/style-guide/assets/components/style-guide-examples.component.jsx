var React = require('react/addons');
var StyleGuideExample = require('./style-guide-example.component.jsx');

var StyleGuideExamples = React.createClass({
  render: function() {
    var language = this.props.exampleLanguage || 'javascript';

    return (
      <div className="style-guide__examples">
        <header className="style-guide__section-header">Examples</header>
        {this.props.examples.map(function(example, key) {
          return (
            <StyleGuideExample
              key={key}
              description={example.description}
              example={example.example}
              exampleLanguage={language}
              exampleString={example.exampleString} />
          );
        })}
      </div>
    );
  }
});

module.exports = StyleGuideExamples;
