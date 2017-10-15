import PropTypes from 'prop-types';
import React from 'react';
import ExtendText from '../../../../../../../src/components/extend-text/ExtendText';
import Button from '../../../../../../../src/components/button/Button';

class ExtendTextTaggingExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [{
        display: 'Item 1',
        value: 1
      }, {
        display: 'Item 2',
        value: 2
      }, {
        display: 'Item 3',
        value: 3
      }, {
        display: 'Item 4',
        value: 4
      }, {
        display: 'Item 5',
        value: 5
      }],
      value: null
    };
  }

  onChange = (newValue) => {
    this.setState({
      value: newValue
    });
  }

  onResetValues = () => {
    this.setState({
      value: [{
        display: 'Item 1',
        value: 1
      }]
    });
  }

  render() {
    return (
      <span>
        <Button onClick={this.onResetValues}>Reset Values</Button>
        <ExtendText
          options={this.state.options}
          value={this.state.value}
          onChange={this.onChange}
          multiple={true}
          addTagOnKeyCode={188}
          allowCreate={true}
          placeholder="Type to add another..."
        />
      </span>
    );
  }
}

ExtendTextTaggingExample.contextTypes = {
  router: PropTypes.object.isRequired
};

export default ExtendTextTaggingExample;
