import React from 'react';

import {runAlgorithm} from './assets/javascript/helpers';

class AlgorithmsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    runAlgorithm('bubble', 5);
    runAlgorithm('quick', 5);
    runAlgorithm('merge', 5);

    runAlgorithm('bubble', 50);
    runAlgorithm('quick', 50);
    runAlgorithm('merge', 50);

    runAlgorithm('bubble', 150);
    runAlgorithm('quick', 150);
    runAlgorithm('merge', 150);

    runAlgorithm('bubble', 500);
    runAlgorithm('quick', 500);
    runAlgorithm('merge', 500);

    runAlgorithm('bubble', 1000);
    runAlgorithm('quick', 1000);
    runAlgorithm('merge', 1000);

    runAlgorithm('bubble', 5000);
    runAlgorithm('quick', 5000);
    runAlgorithm('merge', 5000);

    return (
      <div className="p-showcase-algorithms">
        <h1>Algorithms</h1>
        <p>Log in the log.</p>
      </div>
    );
  }
}

AlgorithmsPage.displayName = 'AlgorithmsPage';

AlgorithmsPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default AlgorithmsPage;
