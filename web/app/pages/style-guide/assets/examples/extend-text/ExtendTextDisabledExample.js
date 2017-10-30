import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {API_URL} from 'app/constants/api';
import {arrayToExtendTextOptions} from 'src/utilities/array';

import ExtendText from 'src/components/extend-text/ExtendText';

let asyncGetData = async (input, callback) => {
  const response = await axios.get(`${API_URL}/tags?delay=1000`);

  callback({
    options: arrayToExtendTextOptions(response.data),
  });
};

let debouncedAsyncGetData = debounce(asyncGetData, 500);

class ExtendTextDisabledExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null
    };
  }

  onChange = newValue => {
    this.setState({
      value: newValue,
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

ExtendTextDisabledExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextDisabledExample;
