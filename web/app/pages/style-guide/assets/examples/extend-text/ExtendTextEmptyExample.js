import PropTypes from 'prop-types';
import React from 'react';
import ExtendText from 'src/components/extend-text/ExtendText';

class ExtendTextEmptyExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      value: null
    };
  }

  onChange = newValue => {
    this.setState({
      value: newValue
    });
  };

  render() {
    return (
      <ExtendText
        options={this.state.options}
        value={this.state.value}
        onChange={this.onChange}
        allowCreate
      />
    );
  }
}

ExtendTextEmptyExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextEmptyExample;
