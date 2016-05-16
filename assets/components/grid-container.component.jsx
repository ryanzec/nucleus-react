import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class GridContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let baseClass = 'container';

    if (this.props.isFixed) {
      baseClass += '-fluid';
    }

    let cssClasses = [baseClass];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isFixed')}
      >
        {this.props.children}
      </div>
    );
  }
}

GridContainer.displayName = 'GridContainer';

GridContainer.propTypes = {
  className: React.PropTypes.string,
  isFixed: React.PropTypes.bool
};

GridContainer.defaultProps = {
  className: null,
  isFixed: false
};

export default GridContainer;
