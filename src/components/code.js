import React from 'react';
import ReactDOM from 'react-dom';
import { pureRenderShouldComponentUpdate } from '../utilities/component';

class Code extends React.Component {
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

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentDidUpdate() {
    window.Prism.highlightElement(this.getCodeElement());
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  getCodeElement() {
    if (this.props.isInline === true) {
      return ReactDOM.findDOMNode(this);
    }

    return ReactDOM.findDOMNode(this).querySelector('code');
  }

  render() {
    const preCssClasses = [];
    const codeAttributes = {};
    const preAttributes = {};

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

    codeAttributes.className = `language-${this.props.language}`;
    preAttributes.className = preCssClasses.join(' ');

    if (this.props.isInline !== true) {
      return (
        React.createElement('pre', preAttributes,
          React.createElement('code', codeAttributes, this.props.children)
        )
      );
    }

    return (
      React.createElement('code', codeAttributes, this.props.children)
    );
  }
}

Code.propTypes = {
  className: React.PropTypes.string,
  language: React.PropTypes.string,
  showLineNumbers: React.PropTypes.bool,
  lineNumberStart: React.PropTypes.number,
  highlightLines: React.PropTypes.string,
  isInline: React.PropTypes.bool
};

Code.defaultProps = {
  className: null,
  language: null,
  showLineNumbers: true,
  lineNumberStart: null,
  hightlightLines: null,
  isInline: false
};

export default Code;
