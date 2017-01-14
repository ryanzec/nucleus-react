import React from 'react';
import ReactDOM from 'react-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import configuration from '../configuration';

const appenedElements = {};
const appendElementContainer = document.querySelector(configuration.get('appendElementSelector'));

const getAppendedElements = () => {
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

//NOTE: this is needed to order to make sure this component support the drag and drop functionality sicne it's content is render outside the main application
//NOTE: component
class AppendElementsDragDropContainer extends React.Component {
    render() {
        return(
            <span>{this.props.appendedElements}</span>
        );
    }
}

AppendElementsDragDropContainer = DragDropContext(HTML5Backend)(AppendElementsDragDropContainer);

class AppendBodyComponent extends React.Component {
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
