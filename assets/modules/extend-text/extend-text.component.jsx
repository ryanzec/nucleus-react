var React = require('react/addons');
var _ = require('lodash');
var equals = require('deep-equal');
var domUtitlities = require('dom-utilities');

var ExtendText = React.createClass({
  componentDidMount: function() {
    if(this.props.onChange && this.props.initialValue) {
      this.props.onChange(this.props.initialValue);
    }

    /* istanbul ignore else */
    if(this.props.autoHeightResize === true) {
      domUtitlities.autoSetHeight(this.getDOMNode().querySelector('.extend-text__display-input'));
    }

    this.setAutoCompletePosition();
    this.getData = _.debounce(function(value) {
      if(this.props.loadingIndicatorEnabled === true) {
        this.setState({
          isLoading: true,
          isActive: true
        });
      }

      this.props.getData.apply(this, [value]).then(function(items) {
        this.setState({
          autoCompleteItems: items,
          isActive: true,
          isLoading: false
        });
      }.bind(this), function(error) {
        throw new Error('ExtendText could not retrieve data, error: ' + error);
      }.bind(this));
    }.bind(this), this.props.debounce);

    if(this.props.characterThreshold <= 0) {
      this.getData(this.state.value);
    }
  },

  componentDidUpdate: function(previousProps, previousState) {
    if(equals(this.state.value, previousState.value) !== true) {
      this.setState({
        lastAutoCompleteItems: this.state.autoCompleteItems
      });

      var inputElement = this.getInputElement();

      if(inputElement.value.length >= this.props.characterThreshold) {
        this.getData(this.state.value);
      }
    }

    if(equals(this.state.value, previousState.value) !== true || this.state.autoCompleteItems !== previousState.autoCompleteItems) {
      if(this.state.value && this.isAutoCompleteDisplayValue(this.state.value) === false) {
        this.setState({
          isNewValue: true
        });
      } else {
        this.setState({
          isNewValue: false
        });
      }
    }
  },

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    initialValue: React.PropTypes.string,
    autoHeightResize: React.PropTypes.bool,
    emptyIndicator: React.PropTypes.node,
    getData: React.PropTypes.func.isRequired,
    allowFreeForm: React.PropTypes.bool,
    newIndicator: React.PropTypes.node,
    loadingIndicator: React.PropTypes.node,
    characterThreshold: React.PropTypes.number,
    debounce: React.PropTypes.number,
    loadingIndicatorEnabled: React.PropTypes.bool
  },

  getDefaultProps: function() {
    /* jshint ignore:start */
    return {
      onChange: null,
      initialValue: null,
      autoHeightResize: true,
      emptyIndicator: (
        <span>No Options Found</span>
      ),
      allowFreeForm: false,
      newIndicator: (
        <span>New</span>
      ),
      displayProperty: 'display',
      loadingIndicator: (
        <span>Loading...</span>
      ),
      characterThreshold: 0,
      debounce: 0,
      loadingIndicatorEnabled: true
    };
    /* jshint ignore:end */
  },

  getInitialState: function() {
    return {
      value: this.props.initialValue,
      autoCompleteItems: [],
      isActive: false,
      isLoading: false,
      focusedAutoCompleteItem: null,
      isNewValue: false,
      lastAutoCompleteItems: []
    };
  },

  getCssClasses: function() {
    var cssClasses = ['extend-text'];

    if(this.state.isActive === true && this.state.isLoading !== true) {
      cssClasses.push('is-active');
    }

    return cssClasses;
  },

  getInputElement: function() {
    return this.getDOMNode().querySelector('.extend-text__display-input');
  },

  isAutoCompleteDisplayValue: function(value) {
    var matchCurrent = this.state.autoCompleteItems.filter(function(autoCompleteItem) {
      return _.isObject(value) ? equals(autoCompleteItem, value) : autoCompleteItem[this.props.displayProperty] === value;
    }.bind(this)).length;
    var matchLast = this.state.lastAutoCompleteItems.filter(function(autoCompleteItem) {
      return _.isObject(value) ? equals(autoCompleteItem, value) : autoCompleteItem[this.props.displayProperty] === value;
    }.bind(this)).length;

    return matchCurrent === 1 || matchLast === 1;
  },

  updateValue: function(newValue) {
    var updatedState = {};

    if(_.isNumber(newValue) && this.state.autoCompleteItems[newValue]) {
      newValue = this.state.autoCompleteItems[newValue];
      updatedState.isActive = false;
      updatedState.focusedAutoCompleteItem = null;
    }

    //make undefineds/nulls earier to work with
    if(!newValue) {
      newValue = '';
    }

    /* istanbul ignore else */
    if(this.props.onChange) {
      this.props.onChange(newValue);
    }

    var inputElement = this.getInputElement();

    if(_.isObject(newValue)) {
      inputElement.value = newValue[this.props.displayProperty];
    } else {
      inputElement.value = newValue;
    }

    updatedState.value = newValue;

    this.setState(updatedState);
  },

  onInput: function(event) {
    this.updateValue(event.target.value);

    /* istanbul ignore else */
    if(this.props.autoHeightResize === true) {
      domUtitlities.autoSetHeight(this.getDOMNode().querySelector('.extend-text__display-input'));
    }

    this.setAutoCompletePosition();
  },

  setAutoCompletePosition: function() {
    var autoCompleteElement = this.getDOMNode().querySelector('.extend-text__auto-complete-container');

    /* istanbul ignore else */
    if(autoCompleteElement) {
      var inputDimensions = domUtitlities.getDimensions(this.getInputElement());

      autoCompleteElement.style.top = inputDimensions.height + 'px';
    }
  },

  onFocus: function() {
    var inputElement = this.getInputElement();

    if(inputElement.value.length >= this.props.characterThreshold) {
      this.setState({
        isActive: true
      });
    }
  },

  onBlur: function() {
    var inputElement = this.getInputElement();

    if(this.state.focusedAutoCompleteItem !== null) {
      this.updateValue(this.state.focusedAutoCompleteItem);
    } else if(this.state.autoCompleteItems.length === 1 && this.state.autoCompleteItems[0][this.props.displayProperty] === inputElement.value) {
      this.updateValue(0);
    } else if(this.props.allowFreeForm !== true) {
      this.updateValue('');
    }

    this.setState({
      isActive: false
    });
  },

  increaseFocusedAutoCompleteItem: function() {
    var newFocusedAutoCompleteItem = this.state.focusedAutoCompleteItem;

    if(newFocusedAutoCompleteItem === null) {
      newFocusedAutoCompleteItem = 0;
    } else {
      newFocusedAutoCompleteItem += 1;
    }

    if(newFocusedAutoCompleteItem >= this.state.autoCompleteItems.length) {
      newFocusedAutoCompleteItem = 0;
    }

    this.setState({
      focusedAutoCompleteItem: newFocusedAutoCompleteItem
    });
  },

  decreaseFocusedAutoCompleteItem: function() {
    var newFocusedAutoCompleteItem = this.state.focusedAutoCompleteItem;

    if(newFocusedAutoCompleteItem === null) {
      newFocusedAutoCompleteItem = this.state.autoCompleteItems.length - 1;
    } else {
      newFocusedAutoCompleteItem -= 1;
    }

    if(newFocusedAutoCompleteItem < 0) {
      newFocusedAutoCompleteItem = this.state.autoCompleteItems.length - 1;
    }

    this.setState({
      focusedAutoCompleteItem: newFocusedAutoCompleteItem
    });
  },

  onKeyDown: function(event) {
    if(this.state.isActive) {
      switch(event.which) {
        case 27: //escape
          event.preventDefault();
          this.setState({
            focusedAutoCompleteItem: null,
            isActive: false
          });
          this.updateValue('');
          this.getInputElement().blur();
          break;
      }
    }

    if(this.state.isActive && this.state.autoCompleteItems.length > 0) {
      switch(event.which) {
        case 38: //up arrow
          event.preventDefault();
          this.decreaseFocusedAutoCompleteItem();
          break;

        case 40: //down arrow
          event.preventDefault();
          this.increaseFocusedAutoCompleteItem();
          break;

        case 13: //enter
          event.preventDefault();
          this.updateValue(this.state.focusedAutoCompleteItem);
          break;

        //TODO: tab key
      }
    } else if(this.state.autoCompleteItems.length > 0) {
      this.setState({
        isActive: true
      });
    }
  },

  onMouseEnterAutoCompleteItem: function(event) {
    this.setState({
      focusedAutoCompleteItem: parseInt(event.currentTarget.getAttribute('data-key'))
    });
  },

  onMouseDownAutoCompleteItem: function(event) {
    this.updateValue(this.state.focusedAutoCompleteItem);
  },

  renderAutoComplete: function() {
    var autoCompleteDom;

    if(this.state.autoCompleteItems.length > 0) {
      var items = this.state.autoCompleteItems.map(function(item, key) {
        var cssClass = this.state.focusedAutoCompleteItem === key ? 'is-focused' : '';

        /* jshint ignore:start */
        return (
          <li className={cssClass} data-key={key} key={key} onMouseEnter={this.onMouseEnterAutoCompleteItem} onMouseDown={this.onMouseDownAutoCompleteItem}>{item.display}</li>
        );
        /* jshint ignore:end */
      }.bind(this));

      /* jshint ignore:start */
      autoCompleteDom = (
        <ul className="extend-text__auto-complete-options">
          {items}
        </ul>
      );
      /* jshint ignore:end */
    } else {
      /* jshint ignore:start */
      autoCompleteDom = (
        <div className="extend-text__empty-indicator">{this.props.emptyIndicator}</div>
      );
      /* jshint ignore:end */
    }

    var cssClasses = ['extend-text__auto-complete-container'];

    if(!this.state.isActive) {
      cssClasses.push('u-hide');
    }

    var statusIndicator;

    if(this.props.allowFreeForm === true && this.state.isNewValue === true && this.state.isLoading !== true) {
      /* jshint ignore:start */
      statusIndicator = (
        <div className="extend-text__new-indicator">{this.props.newIndicator}</div>
      );
      /* jshint ignore:end */
    } else if(this.state.isActive === true && this.state.isLoading === true) {
      /* jshint ignore:start */
      statusIndicator = (
        <div className="extend-text__loading-indicator">{this.props.loadingIndicator}</div>
      );
      /* jshint ignore:end */
    }

    /* jshint ignore:start */
    return (
      <span>
        <div className={cssClasses.join(' ')}>{autoCompleteDom}</div>
        {statusIndicator}
      </span>
    );
    /* jshint ignore:end */
  },

  render: function() {
    /* jshint ignore:start */
    return (
      <div className={this.getCssClasses().join(' ')}>
        <textarea className="extend-text__display-input" onFocus={this.onFocus} onInput={this.onInput} defaultValue={this.state.value} onBlur={this.onBlur} onKeyDown={this.onKeyDown}></textarea>
        {this.renderAutoComplete()}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = ExtendText;
