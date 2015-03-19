//TODO: need to figure out better way to display the new indicator (maybe in the auto complete list?)

var React = require('react/addons');
var _ = require('lodash');
var equals = require('deep-equal');
var domUtilities = require('dom-utilities');
var SvgIcon = require('./svg-icon.component.jsx');
var InputAutoSizer = require('./input-auto-sizer.component.jsx');

var loadingSvg;
/*eslint-disable*/
loadingSvg = '<svg style="width: 22px; height: 22px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"/> </path> </svg>';
/*eslint-enable*/

var extendText = {};

extendText.displayName = 'ExtendText';

extendText.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  defaultValue: React.PropTypes.string,
  autoHeightResize: React.PropTypes.bool,
  emptyIndicator: React.PropTypes.node,
  getData: React.PropTypes.func.isRequired,
  allowFreeForm: React.PropTypes.bool,
  newIndicator: React.PropTypes.node,
  characterThreshold: React.PropTypes.number,
  debounce: React.PropTypes.number,
  loadingIndicatorEnabled: React.PropTypes.bool,
  preloadData: React.PropTypes.bool,
  taggingEnabled: React.PropTypes.bool
};

extendText.getDefaultProps = function extendTextGetDefaultProps() {
  return {
    onChange: null,
    defaultValue: null,
    autoHeightResize: true,
    emptyIndicator: (
      <span>No Options Found</span>
    ),
    allowFreeForm: false,
    newIndicator: (
      <span>New</span>
    ),
    displayProperty: 'display',
    characterThreshold: 0,
    debounce: 0,
    loadingIndicatorEnabled: true,
    preloadData: false,
    taggingEnabled: false
  };
};

extendText.getInitialState = function extendTextGetInitialState() {
  var value = this.props.defaultValue;

  if (this.props.taggingEnabled === true && value === null) {
    value = [];
  }

  return {
    value: value,
    autoCompleteItems: [],
    isActive: false,
    isLoading: false,
    focusedAutoCompleteItem: null,
    isNewValue: false,
    lastAutoCompleteItems: [],
    displayInputValue: this.props.defaultValue || null,
    searchAttempted: false
  };
};

extendText.componentDidMount = function extendTextComponentDidMount() {
  if (this.props.onChange && this.props.defaultValue) {
    this.props.onChange(this.props.defaultValue);
  }

  this.setAutoCompletePosition();
  this.getData = _.debounce(function extendTextComponentDidMountGeneratedGetDataMethod(value) {
    if (this.props.loadingIndicatorEnabled === true && this.isMounted()) {
      this.setState({
        isLoading: true
      });
    }

    this.props.getData.apply(this, [value]).then(function extendTextComponentDidMountPropsGetDataSuccess(items) {
      var newState = {
        lastAutoCompleteItems: this.state.autoCompleteItems,
        autoCompleteItems: items,
        isLoading: false,
        searchAttempted: true
      };

      if (this.isMounted()) {
        var inputElement = this.getInputElement();

        if (this.isAutoCompleteDisplayValue(inputElement.value) === false && inputElement.value.length > 0) {
          console.log('is new: true');
          this.setState({
            isNewValue: true
          });
        } else {
          console.log('is new: false');
          this.setState({
            isNewValue: false
          });
        }

        this.setState(newState);
      }
    }.bind(this), function extendTextComponentDidMountPropsGetDataError(error) {
      throw new Error('ExtendText could not retrieve data, error: ' + error);
    });
  }.bind(this), this.props.debounce);

  if (this.props.preloadData === true) {
    this.getData(this.state.value);
  }
};

extendText.componentDidUpdate = function extendTextComponentDidUpdate() {
  this.setAutoCompletePosition();
};

extendText.onChange = function extendTextOnChange(event) {
  this.updateDisplayValue(event.target.value);

  if (this.isOverCharacterThreshold(event.target.value)) {
    this.getData(event.target.value);
    this.setState({
      isActive: true
    });
  }

  this.setState({
    displayInputValue: event.target.value
  });
};

extendText.onKeyDown = function extendTextOnKeyDown(event) {
  switch (event.which) {
    case 27: //escape
      event.preventDefault();
      this.setState({
        focusedAutoCompleteItem: null,
        isActive: false
      });
      this.updateDisplayValue('');
      this.getInputElement().blur();
      break;

    case 13: //enter
      event.preventDefault();
      this.selectCurrentValue();
      break;

    case 38: //up arrow
      event.preventDefault();
      this.decreaseFocusedAutoCompleteItem();
      break;

    case 40: //down arrow
      event.preventDefault();
      this.increaseFocusedAutoCompleteItem();
      break;

    case 8: //backspace
      if (this.props.taggingEnabled === true) {
        var inputElement = this.getInputElement();

        if (inputElement.value === '' && this.state.value.length > 0) {
          event.preventDefault();
          this.removeValue(this.state.value.length - 1);
        }
      }
      break;

    default:
      //just continue normally

    //TODO: tab key
  }
};

extendText.onFocus = function extendTextOnFocus() {
  var inputElement = this.getInputElement();

  if (this.isOverCharacterThreshold(inputElement.value)) {
    this.getData(inputElement.value);
    this.setState({
      isActive: true
    });
  }
};

extendText.onBlur = function extendTextOnBlur() {
  if (this.state.isActive) {
    this.selectCurrentValue();
  }
};

extendText.onMouseEnterAutoCompleteItem = function extendTextOnMouseEnterAutoCompleteItem(event) {
  this.setState({
    focusedAutoCompleteItem: parseInt(event.currentTarget.getAttribute('data-key'), 10)
  });
};

extendText.onMouseDownAutoCompleteItem = function extendTextOnMouseDownAutoCompleteItem(event) {
  this.updateValue(parseInt(event.currentTarget.getAttribute('data-key'), 10));
};

extendText.onClickInputContainer = function extendTextOnInputContainerClick() {
  this.refs.input.refs.input.getDOMNode().focus();
};

extendText.getCssClasses = function extendTextGetCssClasses() {
  var cssClasses = ['extend-text'];

  if (this.state.isActive === true) {
    cssClasses.push('is-active');
  }

  if (this.state.isLoading === true || this.state.searchAttempted === false) {
    cssClasses.push('m-display-no-results');
  }

  return cssClasses;
};

extendText.getInputElement = function extendTextGetInputElement() {
  return this.refs.input.refs.input.getDOMNode();
};

extendText.isAutoCompleteDisplayValue = function extendTextIsAutoCompleteDisplayValue(displayValue) {
  var matchCurrent = this.state.autoCompleteItems.filter(function extendTextIsAutoCompleteDisplayValueCurrentFilter(autoCompleteItem) {
    return _.isObject(displayValue) ? equals(autoCompleteItem, displayValue) : autoCompleteItem[this.props.displayProperty] === displayValue;
  }.bind(this)).length;
  var matchLast = this.state.lastAutoCompleteItems.filter(function extendTextIsAutoCompleteDisplayValueLastFilter(autoCompleteItem) {
    return _.isObject(displayValue) ? equals(autoCompleteItem, displayValue) : autoCompleteItem[this.props.displayProperty] === displayValue;
  }.bind(this)).length;

  return matchCurrent === 1 || matchLast === 1;
};

extendText.getAutoCompleteIndex = function extendTextGetAutoCompleteIndex(displayValue) {
  var index = null;

  for (var x = 0; x < this.state.autoCompleteItems.length; x += 1) {
    if (this.state.autoCompleteItems[x].display === displayValue) {
      index = x;
      break;
    }
  }

  return index;
};

extendText.updateDisplayValue = function extendTextUdpateDisplayValue(newValue) {
  var newDisplayValue;

  if (_.isObject(newValue)) {
    newDisplayValue = newValue[this.props.displayProperty];
  } else {
    newDisplayValue = newValue;
  }

  this.setState({
    displayInputValue: newDisplayValue
  });

  if (!this.isOverCharacterThreshold(newValue)) {
    this.setState({
      autoCompleteItems: []
    });
  }
};

extendText.updateValue = function extendTextUpdateValue(newValue, updateDisplayValue) {
  var updatedState = {};

  if (_.isNumber(newValue) && this.state.autoCompleteItems[newValue]) {
    newValue = this.state.autoCompleteItems[newValue];
    updatedState.isActive = false;
    updatedState.focusedAutoCompleteItem = null;
  }

  //make undefineds/nulls earier to work with
  if (!newValue) {
    newValue = '';
  } else if (!_.isObject(newValue) && newValue !== '') {
    newValue = {
      display: newValue,
      value: newValue
    };
  }

  if (this.props.taggingEnabled === true) {
    if (newValue !== '') {
      updatedState.value = _.clone(this.state.value);
      updatedState.value.push(newValue);
    }
  } else {
    updatedState.value = newValue;
  }

  if (updatedState.value && this.props.onChange) {
    this.props.onChange(updatedState.value);
  }

  this.setState(updatedState);

  if (updateDisplayValue === true) {
    this.updateDisplayValue(newValue);
  }
};

extendText.removeValue = function extendTextRemoveValue(valueIndex) {
  var newValue = _.clone(this.state.value);
  newValue.splice(valueIndex, 1);

  this.setState({
    value: newValue
  });
};

extendText.setAutoCompletePosition = function extendTextSetAutoCompletePosition() {
  var autoCompleteElement = this.getDOMNode().querySelector('.extend-text__auto-complete-container');

  /* istanbul ignore else */
  if (autoCompleteElement) {
    //this call is wrapped in a timeout of 0 to allow for the input auto sizer to set correct initial size which is needed to position the auto complete items
    setTimeout(function extendTextSetAutoCompletePositionSetTimeout() {
      if (this.isMounted()) {
        var valueContainerDimensions = domUtilities.getDimensions(this.getDOMNode().querySelector('.extend-text__value-container'));

        autoCompleteElement.style.top = valueContainerDimensions.margins.top + valueContainerDimensions.height + 'px';
        autoCompleteElement.style.left = valueContainerDimensions.margins.left + 'px';
      }
    }.bind(this), 0);
  }
};

extendText.isOverCharacterThreshold = function extendTextIsOverCharacterThreshold(value) {
  if (!this.isMounted()) {
    return false;
  }

  return value.length >= this.props.characterThreshold;
};

extendText.selectCurrentValue = function extendTextSelectCurrentValue() {
  var isNewValue = false;
  var inputElement = this.getInputElement();
  var fullMatchAutoCompleteItem = this.getAutoCompleteIndex(inputElement.value);

  console.log(this.state.focusedAutoCompleteItem);

  if (this.state.focusedAutoCompleteItem !== null) {
    this.updateValue(this.state.focusedAutoCompleteItem, true);
  } else if (this.state.autoCompleteItems.length === 1 && this.state.autoCompleteItems[0][this.props.displayProperty] === inputElement.value) {
    this.updateValue(0, true);
  } else if (fullMatchAutoCompleteItem !== null) {
    this.updateValue(fullMatchAutoCompleteItem, true);
  } else if (this.props.allowFreeForm === true && inputElement.value !== '') {
    this.updateValue(inputElement.value, true);
    isNewValue = true;
  } else {
    this.updateDisplayValue('');
  }

  if (this.props.taggingEnabled === true) {
    this.updateDisplayValue('');
  }

  console.log('is new:' + isNewValue);

  this.setState({
    isActive: false,
    isNewValue: isNewValue
  });
};

extendText.increaseFocusedAutoCompleteItem = function extendTextIncreaseFocusedAutoCompleteItem() {
  if (this.state.autoCompleteItems.length > 0) {
    var newFocusedAutoCompleteItem = this.state.focusedAutoCompleteItem;

    if (newFocusedAutoCompleteItem === null) {
      newFocusedAutoCompleteItem = 0;
    } else {
      newFocusedAutoCompleteItem += 1;
    }

    if (newFocusedAutoCompleteItem >= this.state.autoCompleteItems.length) {
      newFocusedAutoCompleteItem = 0;
    }

    this.setState({
      focusedAutoCompleteItem: newFocusedAutoCompleteItem
    });
  }
};

extendText.decreaseFocusedAutoCompleteItem = function extendTextDecreaseFocusedAutoCompleteItem() {
  if (this.state.autoCompleteItems.length > 0) {
    var newFocusedAutoCompleteItem = this.state.focusedAutoCompleteItem;

    if (newFocusedAutoCompleteItem === null) {
      newFocusedAutoCompleteItem = this.state.autoCompleteItems.length - 1;
    } else {
      newFocusedAutoCompleteItem -= 1;
    }

    if (newFocusedAutoCompleteItem < 0) {
      newFocusedAutoCompleteItem = this.state.autoCompleteItems.length - 1;
    }

    this.setState({
      focusedAutoCompleteItem: newFocusedAutoCompleteItem
    });
  }
};

extendText.renderTags = function extendTextRenderTags() {
  var tags = null;

  if (this.props.taggingEnabled === true && this.state.value.length > 0) {
    tags = this.state.value.map(function extendTextRenderTagsValueMap(item, key) {
      return (
        <div className="extend-text__tag" key={key}>
          {item.display}
          <span onClick={this.removeValue.bind(this, key)}>
            <SvgIcon
              className="extend-text__tag-remove"
              svgPath="/components/nucleus-icons/svg/svg-sprite.svg"
              fragment="x" />
            </span>
        </div>
      );
    }.bind(this));
  }

  return tags;
};

extendText.renderAutoComplete = function extendTextRenderAutoComplete() {
  var autoCompleteDom;

  if (this.state.autoCompleteItems.length > 0) {
    var items = this.state.autoCompleteItems.map(function extendTextRenderAutoCompleteItemsMap(item, key) {
      var cssClass = this.state.focusedAutoCompleteItem === key ? 'is-focused' : '';

      return (
        <li
          className={cssClass}
          data-key={key}
          key={key}
          onMouseEnter={this.onMouseEnterAutoCompleteItem}
          onClick={this.onMouseDownAutoCompleteItem}>
          {item.display}
        </li>
      );
    }.bind(this));

    autoCompleteDom = (
      <ul className="extend-text__auto-complete-options plain-list">
        {items}
      </ul>
    );
  } else {
    autoCompleteDom = (
      <div className="extend-text__empty-indicator">{this.props.emptyIndicator}</div>
    );
  }

  var cssClasses = ['extend-text__auto-complete-container'];

  if (this.state.searchAttempted === false || this.state.isActive === false || this.state.isLoading === true) {
    cssClasses.push('u-hide');
  }

  var statusIndicator;

  if (this.props.allowFreeForm === true && this.state.isNewValue === true && this.state.isLoading !== true) {
    statusIndicator = (
      <div className="extend-text__new-indicator">{this.props.newIndicator}</div>
    );
  } else if (this.state.isActive === true && this.props.loadingIndicatorEnabled === true && this.state.isLoading === true) {
    statusIndicator = (
      <div
        className="extend-text__loading-indicator"
        dangerouslySetInnerHTML={{
          __html: loadingSvg
        }}></div>
    );
  }

  return (
    <span>
      <div className={cssClasses.join(' ')}>{autoCompleteDom}</div>
      {statusIndicator}
    </span>
  );
};

extendText.render = function extendTextRender() {
  return (
    <div className={this.getCssClasses().join(' ')}>
      <div
        className="extend-text__value-container"
        onClick={this.onClickInputContainer}>
        {this.renderTags()}
        <InputAutoSizer
          ref="input"
          type="textarea"
          inputClassName="extend-text__display-input"
          onFocus={this.onFocus}
          onChange={this.onChange}
          value={this.state.displayInputValue}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown} />
      </div>
      {this.renderAutoComplete()}
    </div>
  );
};

module.exports = React.createClass(extendText);
