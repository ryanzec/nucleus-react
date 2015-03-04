var React = require('react/addons');

var CharacterCounter = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    input: React.PropTypes.string.isRequired,
    maxLimit: React.PropTypes.number.isRequired,
    warningLimit: React.PropTypes.number,
    className: React.PropTypes.string,
    onOverLimit: React.PropTypes.func,
    onUnderLimit: React.PropTypes.func
  },

  componentDidUpdate: function(previousProps, previousState) {
    var charactersLeft = this.getCharactersLeft();

    if(charactersLeft < 0 && this.state.previousStatus !== 'over') {
      this.setState({
        previousStatus: 'over'
      });

      /* istanbul ignore else */
      if(this.props.onOverLimit) {
        this.props.onOverLimit();
      }
    } else if(charactersLeft >= 0 && this.state.previousStatus !== 'under') {
      this.setState({
        previousStatus: 'under'
      });

      /* istanbul ignore else */
      if(this.props.onOverLimit) {
        this.props.onUnderLimit();
      }
    }
  },

  getDefaultProps: function() {
    return {
      input: null,
      maxLimit: null,
      warningLimit: 50,
      className: null,
      onOverLimit: null,
      onUnderLimit: null
    };
  },

  getInitialState: function() {
    var charactersLeft = this.getCharactersLeft();

    return {
      previousStatus: charactersLeft >= 0 ? 'under' : 'over'
    };
  },

  getCssClasses: function() {
    var cssClasses = ['character-counter'];
    var charactersLeft = this.getCharactersLeft();

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if(charactersLeft < 0) {
      cssClasses.push('m-over');
    } else if(charactersLeft < this.props.warningLimit) {
      cssClasses.push('m-warning');
    }

    return cssClasses;
  },

  getCharactersLeft: function() {
    return this.props.maxLimit - this.props.input.length;
  },

  render: function() {
    var charactersLeft = this.getCharactersLeft();
    var text;

    if(charactersLeft >= 0) {
      text = window.i18n['components/character-counter'].charactersLeft({
        CHARACTERS_LEFT: charactersLeft
      });
    } else {
      text = window.i18n['components/character-counter'].charactersOver({
        CHARACTERS_OVER: charactersLeft * -1
      });
    }

    return (
      <div className={this.getCssClasses().join(' ')}>
        {text}
      </div>
    );
  }
});

module.exports = CharacterCounter;
