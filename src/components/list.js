import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class List extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['list'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    return cssClasses;
  }

  render() {
    const properties = {
      className: this.getCssClasses().join(' '),
    };
    Object.assign(properties, getPassThroughProperties(this.props, 'className', 'styleType', 'type'));
    return React.createElement(this.props.type, properties, this.props.children);
  }
}

List.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['plain']),
  type: React.PropTypes.oneOf(['ol', 'ul'])
};

List.defaultProps = {
  className: null,
  styleType: null,
  type: 'ul'
};



export default List;
