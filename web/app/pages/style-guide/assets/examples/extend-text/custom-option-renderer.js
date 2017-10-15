import PropTypes from 'prop-types';
import React from 'react';
import request from 'superagent';
import debounce from 'lodash/debounce';

import ExtendText from '../../../../../../../src/components/extend-text/ExtendText';
import SvgIcon from '../../../../../../../src/components/svg-icon/SvgIcon';

let optionRenderer = (option) => {
  return (
    <span className={'u-' + option.textClass + '-text'}>
      <SvgIcon fragment="user" /> {option.display}
    </span>
  );
}

let asyncGetData = (input, callback) => {
  request
    .get('/api/tags?delay=1000')
    .end((error, response) => {
      response.body.tags[0].textClass = 'success';
      response.body.tags[1].textClass = 'info';
      response.body.tags[2].textClass = 'warning';
      response.body.tags[3].textClass = 'danger';

      callback({
        options: response.body.tags,
      });
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
