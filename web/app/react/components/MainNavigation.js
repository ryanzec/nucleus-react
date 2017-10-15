import PropTypes from 'prop-types';
import React from 'react';

class MainNavigation extends React.Component {
  constructor(props) {
    super(props);
  }

  getCssClasses() {
    let cssClasses = ['main-navigation'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div className={this.getCssClasses().join(' ')}>
        {this.props.children}
      </div>
    );
  }
}

MainNavigation.propTypes = {
  className: PropTypes.string
};

MainNavigation.defaultProps = {
  className: null
};

export default MainNavigation
