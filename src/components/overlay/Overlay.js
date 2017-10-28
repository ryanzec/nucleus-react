import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import AppendBodyComponent from 'src/components/append-body-component/AppendBodyComponent';

import styles from 'src/components/overlay/Overlay.module.scss';

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
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    //TODO: remove this and just leave it up to the using code to know when to display or not
    if (instance.props.isActive) {
      cssClasses.push(composedStyles.isActive);
    }

    return cssClasses.join(' ');
  };
};

export const createGetTopContentCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.topContent];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    //TODO: remove this and just leave it up to the using code to know when to display or not
    if (instance.props.isActive) {
      cssClasses.push(composedStyles.topContentActive);
    }

    return cssClasses.join(' ');
  };
};

export const createUpdateSelf = (instance) => {
  return () => {
    let topContentNode = null;

    if (instance.props.children && instance.props.children[0]) {
      topContentNode = (
        <div className={instance.getTopContentCssClasses()}>{instance.props.children}</div>
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
    customStyles: PropTypes.object,
    isActive: PropTypes.bool,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
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
  getTopContentCssClasses = createGetTopContentCssClasses(this);
  updateSelf = createUpdateSelf(this);

  render() {
    return null;
  }
}

export default Overlay;
