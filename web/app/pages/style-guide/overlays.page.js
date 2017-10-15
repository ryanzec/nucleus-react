import PropTypes from 'prop-types';
import React from 'react';

import Button from '../../../../src/components/button';
import Overlay from '../../../../src/components/overlay';
import OverlayAbsolute from '../../../../src/components/overlay-absolute';

class OverlaysPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOverlayActive: false,
      isAbsoluteOverlayActive: false,
      isAbsoluteOverlayWithTextActive: false
    };
  }

  onClickDefault = () => {
    this.setState({
      isOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isOverlayActive: false
      });
    }.bind(this), 2000);
  };

  onClickAbsolute = () => {
    this.setState({
      isAbsoluteOverlayActive: true
    });

    setTimeout(function() {
      this.setState({
        isAbsoluteOverlayActive: false
      });
    }.bind(this), 2000);
  };

  onClickAbsoluteWithText = () => {
    this.setState({
      isAbsoluteOverlayWithTextActive: true
    });

    setTimeout(function() {
      this.setState({
        isAbsoluteOverlayWithTextActive: false
      });
    }.bind(this), 2000);
  };

  render() {
    return (
      <div className="p-style-guide-overlays">
        <h1>Overlays</h1>
        <Button onClick={this.onClickDefault}>Full Page</Button>
        <Overlay isActive={this.state.isOverlayActive}/>
        <div className="absolute-test">
            <Button onClick={this.onClickAbsolute}>Specific Element Page</Button>
            <OverlayAbsolute isActive={this.state.isAbsoluteOverlayActive} />
        </div>
        <div className="absolute-test m-with-overlay-text">
            <Button onClick={this.onClickAbsoluteWithText}>Specific Element Page With Overlay Text</Button>
            <OverlayAbsolute isActive={this.state.isAbsoluteOverlayWithTextActive}>I am text</OverlayAbsolute>
        </div>
      </div>
    );
  }
}

OverlaysPage.contextTypes = {
  router: PropTypes.object.isRequired
};

export default OverlaysPage;
