import React from 'react';
import ReactDOM from 'react-dom';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import lodashClone from 'lodash.clone';

import InputAutoSizer from './input-auto-sizer.component.jsx';

class TextboxInput extends React.Component {
  constructor(props) {
    super(props);

    this.onClickPend = this.onClickPend.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['form-element__field-container'];

    if (this.props.className) {
        cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.displayOnly === true) {
        cssClasses.push('m-display-only');
    }

    if (this.props.disabled === true) {
        cssClasses.push('m-disabled');
    }

    return cssClasses;
  }

  getInputCssClasses() {
    let cssClasses = ['form-element__input-container', 'form-element__input', 'm-text'];
    cssClasses.push('m-' + this.props.type);

    if (this.props.prependNode) {
        cssClasses.push('m-has-prepend');
    }

    if (this.props.appendNode) {
        cssClasses.push('m-has-append');
    }

    return cssClasses;
  }

  getInputPassThroughProps() {
    let props = lodashClone(this.props);

    delete props.className;

    props.value = this.cleanValue(props.value);

    return props;
  }

  cleanValue(value) {
    let defaultValue = this.props.unmanaged === true ? null : '';

    return value || defaultValue;
  }

  onClickPend() {
    ReactDOM.findDOMNode(this.refs.input).focus();
  }

  renderPrepend() {
    let prepend = null;

    if (this.props.prependNode) {
      prepend = (
        <span
          className="form-element__input-prepend"
          onClick={this.onClickPend}
        >
          {this.props.prependNode}
        </span>
      );
    }

    return prepend;
  }

  renderAppend() {
    let append = null;

    if (this.props.appendNode) {
      append = (
        <span
          className="form-element__input-append"
          onClick={this.onClickPend}
        >
          {this.props.appendNode}
        </span>
      );
    }

    return append;
  }

  renderInput() {
    if (this.props.multiLined) {
      return (
        <textarea
          ref="input"
          className="form-element__input-container form-element__input m-textarea"
          {...this.getInputPassThroughProps()}
        />
      );
    } else if (this.props.autoSize) {
      return (
        <InputAutoSizer
          ref="input"
          inputClassName={this.getInputCssClasses().join(' ')}
          {...this.getInputPassThroughProps()}
        />
      );
    }

    return (
      <input
        ref="input"
        className={this.getInputCssClasses().join(' ')}
        {...this.getInputPassThroughProps()}
      />
    );
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, 'className', 'type', 'multiLined', 'appendNode', 'prependNode', 'autoSize', 'unmanaged')}
      >
        {this.renderPrepend()}
        {this.renderInput()}
        {this.renderAppend()}
      </div>
    );
  }
}

TextboxInput.displayName = 'TextboxInput';

TextboxInput.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.string,
  multiLined: React.PropTypes.bool,
  appendNode: React.PropTypes.node,
  prependNode: React.PropTypes.node,
  autoSize: React.PropTypes.bool,
  unmanaged: React.PropTypes.bool
};

TextboxInput.defaultProps = {
  className: null,
  type: 'text',
  multiLined: false,
  appendNode: null,
  prependNode: null,
  autoSize: false,
  unmanaged: false
};

export default TextboxInput;
