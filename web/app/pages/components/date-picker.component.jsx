var React = require('react/addons');
var commonReact = require('../../../../assets/index');
var applicationReact = require('../../react/index');
var fs = require('fs');

var menuStore = require('../../stores/menu.store');

var DatePicker = commonReact.components.DatePicker;

var datePickerPage = {};

datePickerPage.displayName = 'ComponentsDatePickerPage';

datePickerPage.getInitialState = function() {
  return {
    selectedDay1: '01/10/2015'
  };
};

datePickerPage.onClickDate1 = function(value) {
  this.setState({
    selectedDay1: value
  });
},

datePickerPage.componentWillMount = function() {
  menuStore.setActiveMenuItem('Components', 'Date Picker');
};

datePickerPage.render = function() {
  return (
    <div className="p-components-date-picker">
      <div>
        TODO: real documentation, this is just for testing purposes
        <DatePicker
          closeOnClick={true}
          selectedDay={this.state.selectedDay1}
          onClickDate={this.onClickDate1}
        />
      </div>
    </div>
  );
};

module.exports = React.createClass(datePickerPage);
