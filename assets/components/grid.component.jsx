import React from 'react';
import customPropTypes from '../utilities/component/custom-prop-types';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Grid extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['grid'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isForm) {
      cssClasses.push('m-form');

      if (this.props.labelAlignment === 'right') {
        cssClasses.push('m-form-label-right');
      }
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className')}
      >
        {this.props.children}
      </div>
    );
  }
}

Grid.displayName = 'Grid';

Grid.propTypes = {
  className: React.PropTypes.string,
  isForm: React.PropTypes.bool,
  labelAlignment: customPropTypes.gridFormLabelAlignments
};

Grid.defaultProps = {
  className: null,
  isForm: false,
  labelAlignment: 'right'
};

export default Grid;
