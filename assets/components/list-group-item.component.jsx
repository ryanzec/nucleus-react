import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ListGroupItem extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['list-group-item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isDisabled) {
      cssClasses.push('disabled');
    }

    if (this.props.isActive) {
      cssClasses.push('active');
    }

    if (this.props.styleType) {
      cssClasses.push('list-group-item-' + this.props.styleType);
    }

    return cssClasses;
  }

  render() {
    return (
      <li
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isDisabled', 'isActive', 'styleType')}
      >
        {this.props.children}
      </li>
    );
  }
}

ListGroupItem.displayName = 'ListGroupItem';

ListGroupItem.propTypes = {
  className: React.PropTypes.string,
  isDisabled: React.PropTypes.bool,
  isActive: React.PropTypes.bool,
  styleType: React.PropTypes.oneOf(['success', 'info', 'warning', 'danger'])
};

ListGroupItem.defaultProps = {
  className: null,
  isDisabled: false,
  isActive: false,
  styleType: null
};

export default ListGroupItem;
