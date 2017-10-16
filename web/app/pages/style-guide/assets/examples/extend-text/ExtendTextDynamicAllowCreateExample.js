import PropTypes from 'prop-types';
import React from 'react';
import request from 'superagent';
import debounce from 'lodash/debounce';

import ExtendText from 'src/components/extend-text/ExtendText';

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

class ExtendTextDynamicAllowCreateExample extends React.Component {
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
        allowCreate={true}
      />
    );
  }
}

ExtendTextDynamicAllowCreateExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextDynamicAllowCreateExample;
