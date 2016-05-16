import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = [];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isInline) {
      cssClasses.push('form-inline');
    }

    return cssClasses;
  }

  render() {
    return (
      <form
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'isInline')}
      >
        {this.props.children}
      </form>
    );
  }
}

Form.displayName = 'Form';

Form.propTypes = {
  className: React.PropTypes.string,
  isInline: React.PropTypes.bool
};

Form.defaultProps = {
  className: null,
  isInline: false
};

export default Form;
