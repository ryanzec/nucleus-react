import React from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

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

export default AppendElementsDragDropContainer;
