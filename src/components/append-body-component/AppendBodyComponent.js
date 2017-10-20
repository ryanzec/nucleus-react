import React from 'react';
import ReactDOM from 'react-dom';
import configuration from 'src/configuration';
import AppendElementsDragDropContainer from 'src/components/append-body-component/AppendElementsDrahDropContainer';

const appenedElements = {};
const appendElementContainer = document.querySelector(configuration.get('appendElementSelector'));

export const getAppendedElements = () => {
  const elements = [];

  const keys = Object.keys(appenedElements);
  const length = keys.length;

  if (length > 0) {
    keys.forEach((key) => {
      elements.push(appenedElements[key]);
    });
  }

  return elements;
};

class AppendBodyComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.appendElementContainer = appendElementContainer;
  }

  setAppendElementId(id) {
    this.appendElementId = id;
  }

  updateAppendElement(content) {
    appenedElements[this.appendElementId] = content;

    this.updateAppendElements();
  }

  updateAppendElements() {
    ReactDOM.render(<AppendElementsDragDropContainer appendedElements={getAppendedElements()} />, appendElementContainer);
  }

  removeAppendElement() {
    delete appenedElements[this.appendElementId];

    this.updateAppendElements();
  }
}

export default AppendBodyComponent;
