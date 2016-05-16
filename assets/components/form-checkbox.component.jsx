import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormLabel from './form-label.component.jsx';

class FormCheckbox extends React.Component {
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

    return cssClasses;
  }

  render() {
    let containerClassName = 'checkbox';

    if (this.props.isInline) {
      containerClassName += '-inline';
    }

    return (
      <div className={containerClassName}>
        <FormLabel>
          <input
            type="checkbox"
            className={this.getCssClasses().join(' ')}
            {...getPassThroughProperties(this.props, 'className', 'isInline')}
          /> {this.props.children}
        </FormLabel>
      </div>
    );
  }
}

FormCheckbox.displayName = 'FormCheckbox';

FormCheckbox.propTypes = {
  className: React.PropTypes.string,
  isInline: React.PropTypes.bool
};

FormCheckbox.defaultProps = {
  className: null,
  isInline: false
};

export default FormCheckbox;
