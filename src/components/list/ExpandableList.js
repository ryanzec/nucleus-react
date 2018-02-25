import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

import List from './List';
import ListItem from './ListItem';
import SvgIcon from '../svg-icon/SvgIcon';

class ExpandableList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: props.initialIsActive,
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  onClickHandle = () => {
    this.setState({
      isActive: !this.state.isActive,
    });
  }

  getCssClasses() {
    let cssClasses = ['expandable-list'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.state.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses.join(' ');
  }

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

ExpandableList.propTypes = {
  className: PropTypes.string,
  initialIsActive: PropTypes.bool,
  handleNode: PropTypes.node.isRequired,
};

ExpandableList.defaultProps = {
  className: null,
  initialIsActive: true,
};

export default ExpandableList;
