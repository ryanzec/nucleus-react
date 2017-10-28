import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/list/ExpandableList.module.scss';

import List from './List';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createOnClickHandle = (instance) => {
  return () => {
    instance.setState({
      isActive: !instance.state.isActive,
    });
  }
};

class ExpandableList extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    customStyles: PropTypes.object,
    initialIsActive: PropTypes.bool,
    handleNode: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: null,
    customStyles: null,
    initialIsActive: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      isActive: props.initialIsActive,
    }
  }

  onClickHandle = createOnClickHandle(this);
  getCssClasses = createGetCssClasses(this);

  render() {
    const composedStyles = composeStyles(styles, this.props.customStyles);
    const iconFragment = this.state.isActive ? 'caret-down' : 'caret-right';
    const listClassName = this.state.isActive ? composedStyles.listIsActive : composedStyles.list;

    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ExpandableList.propTypes)}
      >
        <div
          className={composedStyles.handle}
          onClick={this.onClickHandle}
        >
          <SvgIcon className={composedStyles.handleSvgIcon} fragment={iconFragment} />{this.props.handleNode}
        </div>
        <List className={listClassName} styleType="plain">
          {this.props.children}
        </List>
      </div>
    );
  }
}

export default ExpandableList;
