import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import styles from 'src/components/code/Code.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = [];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createComponentWillMount = () => {
  return () => {
    if (process.env.ENV !== 'production') {
      if (!window.Prism) {
        console.warn('The Prism JavaScirpt / CSS must be included in order for the <Code /> component to work properly');
      }
    }
  };
};

export const createComponentDidMount = (instance) => {
  return () => {
    window.Prism.highlightElement(instance.getCodeElement());
  };
};

export const createComponentDidUpdate = (instance) => {
  return () => {
    window.Prism.highlightElement(instance.getCodeElement());
  }
};

export const createGetCodeElement = (instance) => {
  return () => {
    if (instance.props.isInline === true) {
      return ReactDOM.findDOMNode(instance);
    }

    return ReactDOM.findDOMNode(instance).querySelector('code');
  };
};

class Code extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    language: PropTypes.string,
    showLineNumbers: PropTypes.bool,
    lineNumberStart: PropTypes.number,
    highlightLines: PropTypes.string,
    isInline: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    language: null,
    showLineNumbers: true,
    lineNumberStart: null,
    hightlightLines: null,
    isInline: false
  };

  componentWillMount = createComponentWillMount(this);
  componentDidMount = createComponentDidMount(this);
  componentDidUpdate = createComponentDidUpdate(this);

  getCssClasses = createGetCssClasses(this);
  getCodeElement = createGetCodeElement(this);

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
        <pre {...preAttributes}>
          <code {...codeAttributes}>
            {this.props.children}
          </code>
        </pre>
      );
    }

    return (
      <code {...codeAttributes}>
        {this.props.children}
      </code>
    );
  }
}

export default Code;
