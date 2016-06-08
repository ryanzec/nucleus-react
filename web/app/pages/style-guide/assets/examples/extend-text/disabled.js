import React from 'react';
import debounce from 'lodash/debounce';

import ExtendText from '../../../../../../../src/components/extend-text';

let asyncGetData = (input, callback) => {
  //NOTE: this just fakes an API call
  setTimeout(() => {
    callback({
      options: [{
        display: 'JavaScript',
        value: 'js'
      }, {
        display: 'ReactJS',
        value: 'react'
      }, {
        display: 'GoLang',
        value: 'go'
      }, {
        display: 'SASS',
        value: 'sass'
      }]
    });
  }, 1000);
};

let debouncedAsyncGetData = debounce(asyncGetData, 500);

class ExtendTextDynamicExample extends React.Component {
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
        disabled={true}
      />
    );
  }
}

ExtendTextDynamicExample.displayName = 'ExtendTextDynamicExample';

ExtendTextDynamicExample.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default ExtendTextDynamicExample;
