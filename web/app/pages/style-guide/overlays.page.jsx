import React from 'react';

import Overlay from '../../../../assets/components/overlay.component.jsx';

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
        <h1 className="test">Overlays</h1>
        <button onClick={this.onClickDefault}>Full Page</button>
        <Overlay isActive={this.state.isOverlayActive} isAbsolute={true} />
        <div className="absolute-test">
            <button onClick={this.onClickAbsolute}>Specific Element Page</button>
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
