import React from 'react';
import ReactDOM from 'react-dom';

class AppendBodyComponent extends React.Component {
  setAppendElement(options = {}) {
    const tag = options.tag || 'div';
    const className = options.className || 'append-body-wrapper';

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

AppendBodyComponent.displayName = 'AppendBodyComponent';

export default AppendBodyComponent;
