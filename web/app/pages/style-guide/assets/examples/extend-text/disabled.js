import PropTypes from 'prop-types';
import React from 'react';
import request from 'superagent';
import debounce from 'lodash/debounce';

import ExtendText from '../../../../../../../src/components/extend-text';

let asyncGetData = (input, callback) => {
  request
    .get('/api/tags?delay=1000')
    .end((error, response) => {
      callback({
        options: response.body.tags,
      });
    });
};

let debouncedAsyncGetData = debounce(asyncGetData, 500);

class ExtendTextDynamicExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  onChange = newValue => {
    this.setState({
      value: newValue
    });
  };

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

ExtendTextDynamicExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextDynamicExample;
