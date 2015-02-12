var React = require('react/addons');

var Icon = React.createClass({
  mixins: [
    React.addons.PureRenderMixin
  ],

  propTypes: {
    svgPath: React.PropTypes.string.isRequired,
    fragment: React.PropTypes.string,
    size: React.PropTypes.string,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      svgPath: null,
      fragment: null,
      size: 'small',
      className: null
    };
  },

  getFullSvgPath: function() {
    var path = this.props.svgPath;

    if(this.props.fragment) {
      path += '#' + this.props.fragment + '-' + this.props.size;
    }

    return path;
  },

  getCssClasses: function() {
    var cssClasses = ['svg-icon'];

    if(this.props.fragment) {
      cssClasses.push(this.props.fragment + '-' + this.props.size);
      cssClasses.push('icon-' + this.props.size);
    }

    if(this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  },

  render: function() {
    var useTag = '<use xlink:href="' + this.getFullSvgPath() + '" />';

    /* jshint ignore:start */
    return (
      <svg className={this.getCssClasses().join(' ')} dangerouslySetInnerHTML={{__html: useTag }} />
    );
    /* jshint ignore:end */
  }
});

module.exports = Icon;
