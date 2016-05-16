import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Label extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['label', 'label-' + this.props.styleType];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isPill) {
      cssClasses.push('label-pill');
    }

    return cssClasses;
  }

  render() {
    return (
      <span
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'styleType', 'isPill')}
      >
        {this.props.children}
      </span>
    );
  }
}

Label.displayName = 'Label';

Label.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['default', 'primary', 'success', 'info', 'warning', 'danger']),
  isPill: React.PropTypes.bool
};

Label.defaultProps = {
  className: null,
  styleType: 'default',
  isPill: false
};

export default Label;
