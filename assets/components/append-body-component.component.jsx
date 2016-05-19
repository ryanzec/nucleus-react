import React from 'react';
import ReactDOM from 'react-dom';

export default class AppendBodyComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  setAppendElement(options = {}) {
    let tag = options.tag || 'div';
    let className = options.className || 'append-body-wrapper';

    this.appendedElement = document.createElement(tag);
    this.appendedElement.className = className;

    document.body.appendChild(this.appendedElement);
  }

  updateAppendElement(content) {
    if (content) {
      ReactDOM.render(content, this.appendedElement);
    } else {
      ReactDOM.render(<noscript />, this.appendedElement);
    }
  }

  removeAppendElement() {
    document.body.removeChild(this.appendedElement);
    this.appendedElement = null;
  }
}
