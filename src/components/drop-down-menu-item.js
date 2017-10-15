import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class DropDownMenuItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['drop-down-menu__item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, DropDownMenuItem.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

DropDownMenuItem.propTypes = {
  className: PropTypes.string
};

DropDownMenuItem.defaultProps = {
  className: null
};

export default DropDownMenuItem;
