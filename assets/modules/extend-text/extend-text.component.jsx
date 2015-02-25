var React = require('react/addons');
var _ = require('lodash');
var equals = require('deep-equal');
var domUtilities = require('dom-utilities');

var ExtendText = React.createClass({
  componentDidMount: function() {
    if(this.props.onChange && this.props.initialValue) {
      this.props.onChange(this.props.initialValue);
    }

    /* istanbul ignore else */
    if(this.props.autoHeightResize === true) {
      this.autoSetHeight();
    }

    this.setAutoCompletePosition();
    this.getData = _.debounce(function(value) {
      if(this.props.loadingIndicatorEnabled === true) {
        if(this._lifeCycleState !== 'UNMOUNTED') {
          this.setState({
            isLoading: true
          });
        }
      }

      this.props.getData.apply(this, [value]).then(function(items) {
        var newState = {
          autoCompleteItems: items,
          isLoading: false
        };

        if(this._lifeCycleState !== 'UNMOUNTED') {
          this.setState(newState);
        }
      }.bind(this), function(error) {
        throw new Error('ExtendText could not retrieve data, error: ' + error);
      }.bind(this));
    }.bind(this), this.props.debounce);

    if(this.props.preloadData === true) {
      this.getData(this.state.value);
    }
  },

  componentDidUpdate: function(previousProps, previousState) {
    if(
      equals(this.state.value, previousState.value) !== true
      || (previousState.isActive === false && this.state.isActive === true)
    ) {
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
    loadingIndicatorEnabled: React.PropTypes.bool,
    preloadData: React.PropTypes.bool
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
      loadingIndicatorEnabled: true,
      preloadData: false
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

  autoSetHeight: function() {
    var inputElement = this.getInputElement();
    var dimensions = domUtilities.getDimensions(inputElement);

    var hiddenDiv = document.createElement('textarea');
    hiddenDiv.className = '';
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.display = 'inline-block';
    hiddenDiv.style.top = '0px';
    hiddenDiv.style.left = '-9999px';
    hiddenDiv.style.width = dimensions.width + 'px';

    //set height to 1px to allow the below calculation to automatically set the height properly
    hiddenDiv.style.height = '1px';

    hiddenDiv.value = inputElement.value;

    document.body.appendChild(hiddenDiv);

    var hiddenDivDimensions = domUtilities.getDimensions(hiddenDiv);

    hiddenDiv.style.height = hiddenDiv.scrollHeight + hiddenDivDimensions.borders.top + hiddenDivDimensions.borders.bottom + 'px';

    hiddenDivDimensions = domUtilities.getDimensions(hiddenDiv);

    inputElement.style.height = hiddenDivDimensions.height + 'px'; //inputElement.scrollHeight + dimensions.borders.top + dimensions.borders.bottom + 'px';

    document.body.removeChild(hiddenDiv);
  },

  getInputElement: function() {
    return this.getDOMNode().querySelector('.extend-text__display-input');
  },

  isAutoCompleteDisplayValue: function(displayValue) {
    var matchCurrent = this.state.autoCompleteItems.filter(function(autoCompleteItem) {
      return _.isObject(displayValue) ? equals(autoCompleteItem, displayValue) : autoCompleteItem[this.props.displayProperty] === displayValue;
    }.bind(this)).length;
    var matchLast = this.state.lastAutoCompleteItems.filter(function(autoCompleteItem) {
      return _.isObject(displayValue) ? equals(autoCompleteItem, displayValue) : autoCompleteItem[this.props.displayProperty] === displayValue;
    }.bind(this)).length;

    return matchCurrent === 1 || matchLast === 1;
  },

  getAutoCompleteIndex: function(displayValue) {
    var index = -1;
    var test = displayValue;

    for(var x = 0; x < this.state.autoCompleteItems.length; x += 1) {
      if(this.state.autoCompleteItems[x].display === displayValue) {
        index = x;
        break;
      }
    }

    return index;
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

  onChange: function(event) {
    this.updateValue(event.target.value);

    /* istanbul ignore else */
    if(this.props.autoHeightResize === true) {
      this.autoSetHeight();
    }

    this.setAutoCompletePosition();
  },

  setAutoCompletePosition: function() {
    var autoCompleteElement = this.getDOMNode().querySelector('.extend-text__auto-complete-container');

    /* istanbul ignore else */
    if(autoCompleteElement) {
      var inputDimensions = domUtilities.getDimensions(this.getInputElement());

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
    var fullMatchAutoCompleteItem = this.getAutoCompleteIndex(inputElement.value);

    if(this.state.focusedAutoCompleteItem !== null) {
      this.updateValue(this.state.focusedAutoCompleteItem);
    } else if(this.state.autoCompleteItems.length === 1 && this.state.autoCompleteItems[0][this.props.displayProperty] === inputElement.value) {
      this.updateValue(0);
    } else if(fullMatchAutoCompleteItem > -1) {
      this.updateValue(fullMatchAutoCompleteItem);
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
        <ul className="extend-text__auto-complete-options plain-list">
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
        <textarea className="extend-text__display-input" onFocus={this.onFocus} onChange={this.onChange} defaultValue={this.state.value} onBlur={this.onBlur} onKeyDown={this.onKeyDown}></textarea>
        {this.renderAutoComplete()}
      </div>
    );
    /* jshint ignore:end */
  }
});

module.exports = ExtendText;
