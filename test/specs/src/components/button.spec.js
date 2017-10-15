import React from 'react';
import ReactDOM from 'react-dom';
// var reactTestUtils from 'react-addons-test-utils');
import Button from '../../../../src/components/button/button';
import testHelper from '../../../test-helper';

describe('button component', function() {
  let div;

  beforeEach(function() {
    div = document.createElement('div');
  });

  it('should render', function() {
    this.component = ReactDOM.render(<Button>button</Button>, div);
    const componentElement = ReactDOM.findDOMNode(this.component);

    expect(componentElement.textContent).to.equal('button');
  });

  it('should be able to add custom classes', function() {
    this.component = ReactDOM.render(<Button className="m-safe">button</Button>, div);
    const componentElement = ReactDOM.findDOMNode(this.component);

    expect(componentElement.className).to.contain('m-safe');
  });

  it('should be able to define style type', function() {
    this.component = ReactDOM.render(<Button styleType="warning">button</Button>, div);
    const componentElement = ReactDOM.findDOMNode(this.component);

    expect(componentElement.className).to.contain('m-warning');
  });

  it('should be able to define as pill', function() {
    this.component = ReactDOM.render(<Button isPill>button</Button>, div);
    const componentElement = ReactDOM.findDOMNode(this.component);

    expect(componentElement.className).to.contain('m-pill');
  });

  it('should be able to define as thin', function() {
    this.component = ReactDOM.render(<Button isThin>button</Button>, div);
    const componentElement = ReactDOM.findDOMNode(this.component);

    expect(componentElement.className).to.contain('m-thin');
  });
});
