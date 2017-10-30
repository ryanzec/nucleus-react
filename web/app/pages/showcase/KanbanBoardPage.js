import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import {API_URL} from 'app/constants/api';

class KanbanBoard extends React.Component {
  render() {
    return (
      <div className="kanban-board">
        {this.props.children}
      </div>
    );
  }
}

class KanbanBoardSwimlane extends React.Component {
  render() {
    return (
      <div className="kanban-board__swimlane">
        {this.props.children}
      </div>
    );
  }
}

class KanbanBoardSwinlaneItem extends React.Component {
  render() {
    return (
      <div className="kanban-board__swimlane-item">
        {this.props.children}
      </div>
    );
  }
}

class KanbanBoardPage extends React.Component {
  constructor(props) {
    super(props);

    // request
    //   .get('/api/users')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/users/1')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/users/2')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/projects')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/projects/1')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/1')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/2')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/3')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/4')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/5')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    // request
    //   .get('/api/issues/6')
    //   .end((error, response) => {
    //     console.log(response);
    //   });

    this.loadData();

    this.state = {};
  }

  async loadData() {
    const response = await axios.get(`${API_URL}/issues`);

    console.log(response.data);
  }

  render() {
    return (
      <div className="p-showcase-kanban-board">
        <h1>Kanban Board</h1>
        <KanbanBoard>
          <KanbanBoardSwimlane>
            <KanbanBoardSwinlaneItem>
              Item 1
            </KanbanBoardSwinlaneItem>
            <KanbanBoardSwinlaneItem>
              Item 2
            </KanbanBoardSwinlaneItem>
            <KanbanBoardSwinlaneItem>
              Item 3
            </KanbanBoardSwinlaneItem>
            <KanbanBoardSwinlaneItem>
              Item 4
            </KanbanBoardSwinlaneItem>
          </KanbanBoardSwimlane>
          <KanbanBoardSwimlane>
            <KanbanBoardSwinlaneItem>
              Item 5
            </KanbanBoardSwinlaneItem>
          </KanbanBoardSwimlane>
          <KanbanBoardSwimlane>
            <KanbanBoardSwinlaneItem>
              Item 6
            </KanbanBoardSwinlaneItem>
          </KanbanBoardSwimlane>
        </KanbanBoard>
      </div>
    );
  }
}

KanbanBoardPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default KanbanBoardPage;
