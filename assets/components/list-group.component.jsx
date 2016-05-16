import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class ListGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['list-group'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isFlush) {
      cssClasses.push('list-group-flush');
    }

    return cssClasses;
  }

  render() {
    return (
      <ul
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isFlush')}
      >
        {this.props.children}
      </ul>
    );
  }
}

ListGroup.displayName = 'ListGroup';

ListGroup.propTypes = {
  className: React.PropTypes.string,
  isFlush: React.PropTypes.bool
};

ListGroup.defaultProps = {
  className: null,
  isFlush: false
};

export default ListGroup;
