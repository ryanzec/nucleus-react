import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from 'src/utilities/component';

class ListItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['list__item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <li
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ListItem.propTypes)}
      >
        {this.props.children}
      </li>
    );
  }
}

ListItem.propTypes = {
  className: PropTypes.string
};

ListItem.defaultProps = {
  className: null
};

export default ListItem;
