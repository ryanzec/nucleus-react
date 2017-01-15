import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Table extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['table', `m-${this.props.alignment}`];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    if (this.props.isVertical) {
      cssClasses.push('is-vertical');
    }

    return cssClasses;
  }

  render() {
    return (
      <table
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'alignment', 'styleType', 'isVertical')}
      >
        {this.props.children}
      </table>
    );
  }
}

Table.propTypes = {
  className: React.PropTypes.string,
  alignment: React.PropTypes.oneOf(['left', 'right', 'center']),
  styleType: React.PropTypes.oneOf(['zebra', 'borderless']),
  isVertical: React.PropTypes.bool,
};

Table.defaultProps = {
  className: null,
  alignment: 'center',
  styleType: null,
  isVertical: false,
};

export default Table;
