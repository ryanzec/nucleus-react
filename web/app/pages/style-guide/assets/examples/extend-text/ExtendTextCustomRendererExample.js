import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import {API_URL} from 'app/constants/api';
import {arrayToExtendTextOptions} from 'src/utilities/array';

import ExtendText from 'src/components/extend-text/ExtendText';
import SvgIcon from 'src/components/svg-icon/SvgIcon';

let optionRenderer = (option) => {
  return (
    <span className={'u-' + option.textClass + '-text'}>
      <SvgIcon fragment="user" styleType={option.textClass} /> {option.display}
    </span>
  );
}

let asyncGetData = async (input, callback) => {
  const response = await axios.get(`${API_URL}/tags?delay=1000`);
  const options = arrayToExtendTextOptions(response.data);

  options[0].textClass = 'success';
  options[1].textClass = 'info';
  options[2].textClass = 'warning';
  options[3].textClass = 'danger';

  callback({
    options,
  });
};

let debouncedAsyncGetData = debounce(asyncGetData, 500);

class ExtendTextCustomRendererExample extends React.Component {
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
        optionRenderer={optionRenderer}
      />
    );
  }
}

ExtendTextCustomRendererExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextCustomRendererExample;
