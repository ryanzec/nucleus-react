import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

import AppendBodyComponent from '../append-body-component/AppendBodyComponent';

class Overlay extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.uniqueId = uuid();
    this.setAppendElementId(this.uniqueId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentDidMount() {
    this.updateSelf();
  }

  componentDidUpdate() {
    this.updateSelf();
  }

  componentWillUnmount() {
    this.removeAppendElement();
  }

  getCssClasses() {
    let cssClasses = ['overlay'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  }

  updateSelf() {
    let topContentNode = null;

    if (this.props.children && this.props.children[0]) {
      topContentNode = (
        <div className="overlay__top-content">{this.props.children}</div>
      );
    }

    this.updateAppendElement(
      <div
        key={`overlay-${this.uniqueId}`}
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Overlay.propTypes)}
      >
        {topContentNode}
      </div>
    );
  }

  render() {
    return null;
  }
}

Overlay.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool
};

Overlay.defaultProps = {
  className: null,
  isActive: false
};

export default Overlay;
