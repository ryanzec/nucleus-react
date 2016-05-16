import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import FormLabel from './form-label.component.jsx';

class FormRadio extends React.Component {
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
    let containerClassName = 'radio';

    if (this.props.isInline) {
      containerClassName += '-inline';
    }

    return (
      <div className={containerClassName}>
        <FormLabel>
          <input
            type="radio"
            className={this.getCssClasses().join(' ')}
            {...getPassThroughProperties(this.props, 'className', 'isInline')}
          /> {this.props.children}
        </FormLabel>
      </div>
    );
  }
}

FormRadio.displayName = 'FormRadio';

FormRadio.propTypes = {
  className: React.PropTypes.string,
  isInline: React.PropTypes.bool
};

FormRadio.defaultProps = {
  className: null,
  isInline: false
};

export default FormRadio;
