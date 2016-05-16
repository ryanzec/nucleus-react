import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Pager extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['pager'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  renderPrevious() {
    var className = '';

    if (this.props.align) {
      className += ' pager-prev';
    }

    if (this.props.disablePrevious) {
      className += ' disabled';
    }

    return (
      <li className={className}><a href="#" onclick={this.props.onClickPrevious}>Previous</a></li>
    );
  }

  renderNext() {
    var className = '';

    if (this.props.align) {
      className += ' pager-next';
    }

    if (this.props.disableNext) {
      className += ' disabled';
    }

    return (
      <li className={className}><a href="#" onclick={this.props.onClickNext}>Next</a></li>
    );
  }

  render() {
    return (
      <nav>
        <ul
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(this.props, 'className', 'align', 'disablePrevious', 'disableNext', 'onClickPrevious', 'onClickNext')}
        >
          {this.renderPrevious()}
          {this.renderNext()}
        </ul>
      </nav>
    );
  }
}

Pager.displayName = 'Pager';

Pager.propTypes = {
  className: React.PropTypes.string,
  align: React.PropTypes.bool,
  disablePrevious: React.PropTypes.bool,
  disableNext: React.PropTypes.bool,
  onClickPrevious: React.PropTypes.func,
  onClickNext: React.PropTypes.func
};

Pager.defaultProps = {
  className: null,
  align: false,
  disabledPrevious: false,
  disableNext: false,
  onClickPrevious: null,
  onClickNext: null
};

export default Pager;
