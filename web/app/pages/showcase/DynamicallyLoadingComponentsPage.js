import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';
import isArray from 'lodash/isArray';

import OverlayAbsolute from 'src/components/overlay/OverlayAbsolute';

class DynamicallyLoadingComponentsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderDataSet1() {
    let tableNode = null;
    let containerClassName = 'data-set1';
    let overlayIsActive = false;

    if (this.props.dataSet1 && isArray(this.props.dataSet1) && this.props.dataSet1.length > 0) {
      tableNode = (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Key</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dataSet1.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.type}</td>
                  <td>{item.key}</td>
                  <td>{item.summary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      containerClassName += ' is-loading';
      overlayIsActive = true;
    }

    return (
      <div className={containerClassName}>
        <h2>Data Set 1</h2>
        {tableNode}
        <OverlayAbsolute isActive={overlayIsActive}>Loading data...</OverlayAbsolute>
      </div>
    );
  }

  renderDataSet2() {
    let tableNode = null;
    let containerClassName = 'data-set2';
    let overlayIsActive = false;

    if (this.props.dataSet2 && isArray(this.props.dataSet2) && this.props.dataSet2.length > 0) {
      tableNode = (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Key</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dataSet2.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.type}</td>
                  <td>{item.key}</td>
                  <td>{item.summary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      containerClassName += ' is-loading';
      overlayIsActive = true;
    }

    return (
      <div className={containerClassName}>
        <h2>Data Set 2</h2>
        {tableNode}
        <OverlayAbsolute isActive={overlayIsActive}>Loading data...</OverlayAbsolute>
      </div>
    );
  }

  renderDataSet3() {
    let tableNode = null;
    let containerClassName = 'data-set3';
    let overlayIsActive = false;

    if (this.props.dataSet3 && isArray(this.props.dataSet3) && this.props.dataSet3.length > 0) {
      tableNode = (
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Key</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {this.props.dataSet3.map((item, key) => {
              return (
                <tr key={key}>
                  <td>{item.type}</td>
                  <td>{item.key}</td>
                  <td>{item.summary}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    } else {
      containerClassName += ' is-loading';
      overlayIsActive = true;
    }

    return (
      <div className={containerClassName}>
        <h2>Data Set 3</h2>
        {tableNode}
        <OverlayAbsolute isActive={overlayIsActive}>Loading data...</OverlayAbsolute>
      </div>
    );
  }

  render() {
    return (
      <div className="p-showcase-dynamically-loading-components">
        <h1>Dynamically Loading Components</h1>
        <p>This page is to show the use case of loading a page without all the data needed loaded up front and have the page components updates dynamically as the data is loaded.</p>
        {this.renderDataSet1()}
        {this.renderDataSet2()}
        {this.renderDataSet3()}
      </div>
    );
  }
}

DynamicallyLoadingComponentsPage.contextTypes = {
  router: PropTypes.object.isRequired
};

var mapStateToProps = function(state) {
  return {
    dataSet1: state.dynamicallyLoadingComponents.one,
    dataSet2: state.dynamicallyLoadingComponents.two,
    dataSet3: state.dynamicallyLoadingComponents.three
  };
};

export default connect(mapStateToProps)(DynamicallyLoadingComponentsPage);
