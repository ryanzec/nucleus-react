import PropTypes from 'prop-types';
import React from 'react';

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

  render() {
    if (this.props.isInline !== true) {
      return (
        <pre>
          <code>
            {this.props.children}
          </code>
        </pre>
      );
    }

    return (
      <code>
        {this.props.children}
      </code>
    );
  }
}

export default Code;
