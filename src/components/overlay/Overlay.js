import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {getPassThroughProperties} from 'src/utilities/component';

import AppendBodyComponent from 'src/components/append-body-component/AppendBodyComponent';

export const createComponentDidMount = (instance) => {
  return () => {
    instance.updateSelf();
  };
};

export const createComponentDidUpdate = (instance) => {
  return () => {
    instance.updateSelf();
  };
};

export const createComponentWillUnmount = (instance) => {
  return () => {
    instance.removeAppendElement();
  };
};

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['overlay'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.isActive) {
      cssClasses.push('active');
    }

    return cssClasses.join(' ');
  };
};

export const createUpdateSelf = (instance) => {
  return () => {
    let topContentNode = null;

    if (instance.props.children && instance.props.children[0]) {
      topContentNode = (
        <div className="overlay__top-content">{instance.props.children}</div>
      );
    }

    instance.updateAppendElement(
      <div
        key={`overlay-${instance.uniqueId}`}
        className={instance.getCssClasses()}
        {...getPassThroughProperties(instance.props, Overlay.propTypes)}
      >
        {topContentNode}
      </div>
    );
  };
};

class Overlay extends AppendBodyComponent {
  static propTypes = {
    className: PropTypes.string,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    isActive: false,
  };

  constructor(props) {
    super(props);

    this.uniqueId = uuid();
    this.setAppendElementId(this.uniqueId);
  }

  componentDidMount = createComponentDidMount(this);
  componentDidUpdate = createComponentDidUpdate(this);
  componentWillUnmount = createComponentWillUnmount(this);
  getCssClasses = createGetCssClasses(this);
  updateSelf = createUpdateSelf(this);

  render() {
    return null;
  }
}

export default Overlay;
