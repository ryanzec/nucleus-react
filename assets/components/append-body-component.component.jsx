import React from 'react';
import ReactDOM from 'react-dom';

export default class AppendBodyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  setAppendElement(options = {}) {
    let tag = options.tag || 'div';
    let className = options.className || 'append-body-wrapper';

    this.bodyElement = document.createElement(tag);
    this.bodyElement.className = className;

    document.body.appendChild(this.bodyElement);
  }

  updateAppendElement(content) {
    if (content) {
      ReactDOM.render(content, this.bodyElement);
    } else {
      ReactDOM.render(<noscript />, this.bodyElement);
    }
  }

  removeAppendElement() {
    document.body.removeChild(this.bodyElement);
    this.bodyElement = null;
  }
}
