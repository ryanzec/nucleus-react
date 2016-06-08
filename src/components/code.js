import React from 'react';
import ReactDOM from 'react-dom';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Code extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentWillMount() {
    if (process.env.ENV !== 'production') {
      if (!window.Prism) {
        console.warn('The Prism JavaScirpt / CSS must be included in order for the <Code /> component to work properly');
      }
    }
  }

  componentDidMount() {
    window.Prism.highlightElement(this.getCodeElement());
  }

  componentDidUpdate() {
    window.Prism.highlightElement(this.getCodeElement());
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  getCodeElement() {
    if (this.props.isInline === true) {
      return ReactDOM.findDOMNode(this);
    } else {
      return ReactDOM.findDOMNode(this).querySelector('code');
    }
  }

  render() {
    var codeCssClasses = ['language-' + this.props.language];
    var preCssClasses = [];
    var codeAttributes = {};
    var preAttributes = {};

    if (this.props.showLineNumbers === true) {
      preCssClasses.push('line-numbers');

      if (this.props.lineNumberStart !== null) {
        preAttributes['data-start'] = this.props.lineNumberStart;
      }
    }

    if (this.props.highlightLines) {
      preAttributes['data-line'] = this.props.highlightLines;
    }

    if (this.props.className) {
      preCssClasses.push(this.props.className);
    }

    codeAttributes.className = codeCssClasses.join(' ');
    preAttributes.className = preCssClasses.join(' ');

    if (this.props.isInline !== true) {
      return (
        React.createElement('pre', preAttributes,
          React.createElement('code', codeAttributes, this.props.children)
        )
      );
    } else {
      return (
        React.createElement('code', codeAttributes, this.props.children)
      );
    }
  }
}

Code.displayName = 'Code';

Code.propTypes = {
  language: React.PropTypes.string,
  showLineNumbers: React.PropTypes.bool,
  lineNumberStart: React.PropTypes.number,
  highlightLines: React.PropTypes.string,
  isInline: React.PropTypes.bool
};

Code.defaultProps = {
  language: null,
  showLineNumbers: true,
  lineNumberStart: null,
  hightlightLines: null,
  isInline: false
};

export default Code;
