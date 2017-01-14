import React from 'react';
import debounce from 'lodash/debounce';

import ExtendText from '../../../../../../../src/components/extend-text';
import SvgIcon from '../../../../../../../src/components/svg-icon';

let optionRenderer = (option) => {
  return (
    <span className={'u-' + option.textClass + '-text'}>
      <SvgIcon fragment="user" /> {option.display}
    </span>
  );
}

let asyncGetData = (input, callback) => {
  //NOTE: this just fakes an API call
  setTimeout(() => {
    callback({
      options: [{
        display: 'JavaScript',
        value: 'js',
        textClass: 'success'
      }, {
        display: 'ReactJS',
        value: 'react',
        textClass: 'info'
      }, {
        display: 'GoLang',
        value: 'go',
        textClass: 'warning'
      }, {
        display: 'SASS',
        value: 'sass',
        textClass: 'danger'
      }]
    });
  }, 1000);
};

let debouncedAsyncGetData = debounce(asyncGetData, 500);

class ExtendTextCustomRendererExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(newValue) {
    this.setState({
      value: newValue
    });
  }

  asyncCallbackFunction(input, callback) {
    debouncedAsyncGetData(input, callback);
  }

  render() {
    return (
      <ExtendText
        asyncOptions={this.asyncCallbackFunction}
        value={this.state.value}
        onChange={this.onChange}
        optionRenderer={optionRenderer}
      />
    );
  }
}

ExtendTextCustomRendererExample.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ExtendTextCustomRendererExample;
