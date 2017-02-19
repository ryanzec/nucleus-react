import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

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

    return cssClasses.join(' ');
  }

  render() {
    // console.log(this.getCssClasses());
    const properties = {
      className: this.getCssClasses(),
    };
    Object.assign(properties, getPassThroughProperties(this.props, List.propTypes));
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
