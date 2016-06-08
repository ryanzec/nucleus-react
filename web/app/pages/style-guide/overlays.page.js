import React from 'react';

import Button from '../../../../src/components/button';
import Overlay from '../../../../src/components/overlay';

class OverlaysPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
      isAbsoluteOverlayActive: false
    };

    this.onClickDefault = this.onClickDefault.bind(this);
    this.onClickAbsolute = this.onClickAbsolute.bind(this);
  }

  onClickDefault() {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 2000);
  }

  onClickAbsolute() {
    this.setState({
      isAbsoluteOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isAbsoluteOverlayActive: false
      });
    }.bind(this), 2000);
  }

  render() {
    return (
      <div className="p-style-guide-overlays">
        <h1>Overlays</h1>
        <Button onClick={this.onClickDefault}>Full Page</Button>
        <Overlay isActive={this.state.isOverlayActive} isAbsolute={true} />
        <div className="absolute-test">
            <Button onClick={this.onClickAbsolute}>Specific Element Page</Button>
            <Overlay isActive={this.state.isAbsoluteOverlayActive} isAbsolute={true} />
        </div>
      </div>
    );
  }
}

OverlaysPage.displayName = 'OverlaysPage';

OverlaysPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default OverlaysPage;
