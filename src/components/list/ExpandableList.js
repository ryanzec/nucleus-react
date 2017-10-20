import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

import List from './List';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['expandable-list'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.state.isActive) {
      cssClasses.push('is-active');
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

class ExpandableList extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    initialIsActive: PropTypes.bool,
    handleNode: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: null,
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
    const iconFragment = this.state.isActive ? 'caret-down' : 'caret-right';
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ExpandableList.propTypes)}
      >
        <div
          className="expandable-list__handle"
          onClick={this.onClickHandle}
        >
          <SvgIcon fragment={iconFragment} />{this.props.handleNode}
        </div>
        <List styleType="plain">
          {this.props.children}
        </List>
      </div>
    );
  }
}

export default ExpandableList;
