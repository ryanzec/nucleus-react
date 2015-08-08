var React = require('react/addons');
var _ = require('lodash');
var equals = require('deep-equal');
var domUtilities = require('dom-utilities');
var SvgIcon = require('./svg-icon.component.jsx');
var InputAutoSizer = require('./input-auto-sizer.component.jsx');
var validatorMixin = require('../mixins/validator.mixin');

var loadingSvg;
/*eslint-disable*/
loadingSvg = '<svg class="extend-text__loading-indicator-svg" style="width: 23px; height: 23px;" version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve"> <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"></path></svg>';
/*eslint-enable*/

var extendText = {};

extendText.displayName = 'ExtendText';

extendText.mixins = [
  validatorMixin
];

extendText.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.any,
  autoHeightResize: React.PropTypes.bool,
  emptyIndicator: React.PropTypes.node,
  getData: React.PropTypes.func,
  allowFreeForm: React.PropTypes.bool,
  newIndicatorNode: React.PropTypes.node,
  characterThreshold: React.PropTypes.number,
  debounce: React.PropTypes.number,
  loadingIndicatorEnabled: React.PropTypes.bool,
  preloadData: React.PropTypes.bool,
  taggingEnabled: React.PropTypes.bool,
  staticData: React.PropTypes.array,
  staticDataFilter: React.PropTypes.func,
  dropDownIconFragment: React.PropTypes.string,
  className: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  allowDuplicates: React.PropTypes.bool,
  newPosition: React.PropTypes.oneOf(['top', 'bottom'])
};

extendText.getDefaultProps = function extendTextGetDefaultProps() {
  return {
    onChange: null,
    value: null,
    autoHeightResize: true,
    emptyIndicator: (
      <span>No Options Found</span>
    ),
    allowFreeForm: false,
    newIndicatorNode: ' (New)',

    displayProperty: 'display',
    characterThreshold: 0,
    debounce: 0,
    loadingIndicatorEnabled: true,
    preloadData: false,
    taggingEnabled: false,
    staticData: [],
    staticDataFilter: function extendTextPropStaticDataFilter(value, data) {
      return data.filter(function extendTextPropStaticDataFilterFilter(dataValue) {
        return dataValue.display.toLowerCase().indexOf(value.toLowerCase()) !== -1 || dataValue.value.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      });
    },
    dropDownIconFragment: null,
    className: null,
    placeholder: null,
    label: null,
    allowDuplicates: false,
    newPosition: 'bottom'
  };
};

extendText.getInitialState = function extendTextGetInitialState() {
  var displayInputValue = null;

  if (this.props.taggingEnabled !== true && this.props.value && this.props.value.display) {
    displayInputValue = this.props.value.display;
  }

  return {
    autoCompleteItems: [],
    isActive: false,
    isLoading: false,
    focusedAutoCompleteItem: null,
    displayInputValue: displayInputValue,
    searchAttempted: false
  };
};

extendText.componentDidMount = function extendTextComponentDidMount() {
  if (
    this.props.onChange
    && (
      (!_.isArray(this.props.value) && this.props.value)
      || (_.isArray(this.props.value) && this.props.value.length > 0)
    )
  ) {
    this.props.onChange(this.props.value);
  }

  this.setAutoCompletePosition();

  this.getData = _.debounce(function extendTextComponentDidMountGeneratedGetDataMethod(value) {
    //certain actions should not trigger data pull (like if the input has been blurred or you remove a value)
    if (this.skipNextDataPull === true) {
      this.skipNextDataPull = false;
      return;
    }

    if (this.props.staticData.length > 0) {
      this.setState({
        autoCompleteItems: this.filterSelectedValues(this.props.staticDataFilter(value, this.props.staticData)),
        isActive: true,
        searchAttempted: true
      });
    } else {
      if (this.props.loadingIndicatorEnabled === true && this.isMounted()) {
        var newState = {
          isLoading: true
        };

        if (this.state.searchAttempted === true || this.props.preloadData === false) {
          newState.isActive = true;
        }

        this.setState(newState);
      }

      this.props.getData.apply(this, [value]).then(function extendTextComponentDidMountPropsGetDataSuccess(items) {
        /* istanbul ignore next */
        if (this.isMounted()) {
          this.setState({
            autoCompleteItems: this.filterSelectedValues(items),
            isLoading: false,
            searchAttempted: true
          });
        }
      }.bind(this), function extendTextComponentDidMountPropsGetDataError(error) {
        //TODO: do we need to do anythign specific if it is an error?
        this.setState({
          autoCompleteItems: [],
          isLoading: false,
          searchAttempted: true
        });
      }.bind(this));
    }
  }.bind(this), this.props.debounce);

  if (this.props.preloadData === true) {
    this.getData(this.props.value);
  }
};

extendText.componentDidUpdate = function extendTextComponentDidUpdate(previousProps) {
  this.setAutoCompletePosition();

  if (equals(previousProps.value, this.props.value) === false) {
    var displayInputValue = '';

    if (this.props.taggingEnabled !== true && this.props.value && this.props.value.display) {
      displayInputValue = this.props.value.display;
    }

    this.updateDisplayValue(displayInputValue);

    if (
      this.props.taggingEnabled === true
      && this.isOverCharacterThreshold('')
      && equals(document.activeElement, this.getInputElement())
    ) {
      this.getData('');
    } else {
      this.setState({
        isActive: false
      });
    }
  }
};

extendText.filterSelectedValues = function extendTextFilterSelectedValues(data) {
  var autoCompleteItems = _.clone(data);

  //NOTE: only filter is not remote data, if remote, it is expect the remote API will do the proper filtering that is needed
  if (this.props.staticData.length > 0) {
    autoCompleteItems = data.filter(function extendTextFilterSelectedValuesDataFilter(value) {
      var isSelected = false;
      var valueCount = _.isArray(this.props.value) ? this.props.value.length : 0;

      for (var x = 0; x < valueCount; x += 1) {
        if (this.props.value[x].value === value.value) {
          isSelected = true;
        }
      }

      return !isSelected;
    }.bind(this));
  }

  if (
    this.state.displayInputValue
    && this.props.allowFreeForm === true
    && !this.autoCompleteItemExists({display: this.state.displayInputValue, value: this.state.displayInputValue}, autoCompleteItems)
  ) {
    var addMethod = this.props.newPosition === 'bottom' ? 'push' : 'unshift';

    autoCompleteItems[addMethod]({
      display: this.state.displayInputValue,
      value: this.state.displayInputValue,
      isNew: true
    });
  }

  return autoCompleteItems;
};

extendText.cleanValue = function extendTextCleanValue(value) {
  return value;
};

extendText.getValidationInitialValue = function extendTextGetValidationInitialValue() {
  return this.props.value;
};

extendText.onChange = function extendTextOnChange(event) {
  this.valueHasChanged = true;
  this.updateDisplayValue(event.target.value);

  if (this.isOverCharacterThreshold(event.target.value)) {
    this.getData(event.target.value);
  } else {
    this.setState({
      isActive: false
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

        if (inputElement.value === '' && this.props.value.length > 0) {
          event.preventDefault();
          this.removeValue(this.props.value.length - 1);
        }
      }
      break;

    case 9: //tab
      this.selectCurrentValue();
      break;

    default:
      //just continue normally
  }
};

extendText.onFocus = function extendTextOnFocus() {
  this.skipNextDataPull = false;
  this.valueHasChanged = false;
  var inputElement = this.getInputElement();

  if (this.isOverCharacterThreshold(inputElement.value)) {
    this.getData(inputElement.value);
  }
};

extendText.onBlur = function extendTextOnBlur() {
  if (this.state.isActive) {
    if (this.valueHasChanged) {
      if (this.props.taggingEnabled === true) {
        this.updateDisplayValue('');
      } else {
        this.updateValue('', true);
      }
    }

    this.skipNextDataPull = true;
    this.setState({
      focusedAutoCompleteItem: null,
      isActive: false
    });
  }
};

extendText.onMouseEnterAutoCompleteItem = function extendTextOnMouseEnterAutoCompleteItem(event) {
  this.setState({
    focusedAutoCompleteItem: parseInt(event.currentTarget.getAttribute('data-key'), 10)
  });
};

extendText.onMouseDownAutoCompleteItem = function extendTextOnMouseDownAutoCompleteItem(event) {
  this.valueHasChanged = true;
  this.updateValue(parseInt(event.currentTarget.getAttribute('data-key'), 10), true);
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

  if (this.validator && this.validator.shouldRenderValidation()) {
    cssClasses.push(this.validator.valid ? 'm-valid' : 'm-invalid');
  }

  if (this.props.className) {
    cssClasses = cssClasses.concat(this.props.className.split(' '));
  }

  return cssClasses;
};

extendText.getInputElement = function extendTextGetInputElement() {
  return this.refs.input.refs.input.getDOMNode();
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

extendText.tagAlreadyExists = function extendTextTagAlreadyExists(tag) {
  if (!this.props.value) {
    return false;
  }

  var count = this.props.value.length;

  for (var x = 0; x < count; x += 1) {
    if (this.props.value[x].value === tag.value) {
      return true;
    }
  }

  return false;
};

extendText.autoCompleteItemExists = function extendTextAutoCompleteItemExists(item) {
  if (!this.state.autoCompleteItems) {
    return false;
  }

  var count = this.state.autoCompleteItems.length;

  for (var x = 0; x < count; x += 1) {
    if (this.state.autoCompleteItems[x].display === item.display) {
      return true;
    }
  }

  return false;
};

extendText.updateValue = function extendTextUpdateValue(newValue, updateDisplayValue) {
  var updatedState = {};
  var newFullValue;

  if (_.isNumber(newValue) && this.state.autoCompleteItems[newValue]) {
    newValue = this.state.autoCompleteItems[newValue];
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
    newFullValue = _.clone(this.props.value);

    if (newValue !== '' && (this.props.allowDuplicates === true || !this.tagAlreadyExists(newValue))) {
      newFullValue.push(newValue);
    } else if (
      this.isOverCharacterThreshold('')
      && equals(document.activeElement, this.getInputElement())
    ) {
      this.getData('');
    } else {
      updatedState.isActive = false;
    }
  } else {
    newFullValue = newValue;
  }

  if ((this.valueHasChanged === true || this.state.focusedAutoCompleteItem !== null) && this.props.onChange) {
    //standardize empty value
    if (!newFullValue && this.props.taggingEnabled === true) {
      newFullValue = [];
    } else if (!newFullValue) {
      newFullValue = null;
    }

    this.props.onChange(newFullValue);
    this.valueHasChanged = false;

    if (updateDisplayValue === true) {
      this.updateDisplayValue(newFullValue);
    }
  }

  this.setState(updatedState);
  this.validate(newFullValue);
};

extendText.validate = function extendTextValidate(value) {
  if (this.validator) {
    this.validator.validate(value);
  }
};

extendText.onMouseUpRemoveTag = function extendTextOnMouseUpRemoveTag(valueIndex) {
  return function extendTextOnMouseUpRemoveTagGeneratedCallback(event) {
    this.skipNextDataPull = true;
    event.stopPropagation();
    this.removeValue(valueIndex);
    //this.getInputElement().focus();
  }.bind(this);
};

extendText.removeValue = function extendTextRemoveValue(valueIndex) {
  var newValue = _.clone(this.props.value);
  newValue.splice(valueIndex, 1);

  if (this.props.onChange) {
    this.props.onChange(newValue);
  }

  this.validate(newValue);
};

extendText.setAutoCompletePosition = function extendTextSetAutoCompletePosition() {
  var autoCompleteElement = this.getDOMNode().querySelector('.extend-text__auto-complete-container');

  if (autoCompleteElement) {
    //this call is wrapped in a timeout of 0 to allow for the input auto sizer to set correct initial size which is needed to position the auto complete items
    setTimeout(function extendTextSetAutoCompletePositionSetTimeout() {
      /* istanbul ignore else */
      if (this.isMounted()) {
        var valueContainerDimensions = domUtilities.getDimensions(this.getDOMNode().querySelector('.extend-text__value-container'));

        autoCompleteElement.style.top = valueContainerDimensions.height - valueContainerDimensions.borders.bottom + 'px';
        autoCompleteElement.style.left = valueContainerDimensions.margins.left - valueContainerDimensions.borders.left + 'px';
      }
    }.bind(this), 0);
  }
};

extendText.isOverCharacterThreshold = function extendTextIsOverCharacterThreshold(value) {
  /* istanbul ignore next */
  if (!this.isMounted()) {
    return false;
  }

  return _.isString(value) && value.length >= this.props.characterThreshold;
};

extendText.selectCurrentValue = function extendTextSelectCurrentValue() {
  var inputElement = this.getInputElement();
  var fullMatchAutoCompleteItem = this.getAutoCompleteIndex(inputElement.value);

  if (this.state.focusedAutoCompleteItem !== null) {
    this.updateValue(this.state.focusedAutoCompleteItem, true);
  } else if (this.state.autoCompleteItems.length === 1 && this.state.autoCompleteItems[0][this.props.displayProperty] === inputElement.value) {
    this.updateValue(0, true);
  } else if (fullMatchAutoCompleteItem !== null) {
    this.updateValue(fullMatchAutoCompleteItem, true);
  } else if (this.props.allowFreeForm === true && inputElement.value !== '') {
    this.updateValue(inputElement.value, true);
  } else if (this.props.taggingEnabled !== true) {
    this.updateValue('', true);
  }

  if (this.props.taggingEnabled === true) {
    this.updateDisplayValue('');
  }
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

extendText.getPlaceholder = function extendTextGetPlaceholder() {
  var placeholder = null;

  if (this.props.placeholder && (this.props.taggingEnabled === false || this.props.value.length === 0)) {
    placeholder = this.props.placeholder;
  }

  return placeholder;
};

extendText.renderTags = function extendTextRenderTags() {
  var tags = null;

  if (this.props.taggingEnabled === true && this.props.value.length > 0) {
    tags = this.props.value.map(function extendTextRenderTagsValueMap(item, key) {
      var className = 'extend-text__tag';

      if (item.className) {
        className += ' ' + item.className;
      }

      return (
        <div
          className={className}
          key={key}
        >
          {item.display}
          <SvgIcon isClickable={true} isQuiet={true} onMouseUp={this.onMouseUpRemoveTag(key)} className="extend-text__tag-remove" fragment="x" />
        </div>
      );
    }.bind(this));
  }

  return tags;
};

extendText.renderAutoComplete = function extendTextRenderAutoComplete() {
  var autoCompleteDom;

  if (this.state.autoCompleteItems.length > 0 && this.state.isActive === true) {
    var items = this.state.autoCompleteItems.map(function extendTextRenderAutoCompleteItemsMap(item, key) {
      var cssClass = this.state.focusedAutoCompleteItem === key ? 'is-focused' : '';
      var displayValue = item.display;

      if (item.isNew) {
        displayValue = (
          <span>
            {item.display}
            <span className="extend-text__new-indicator">
              {this.props.newIndicatorNode}
            </span>
          </span>
        );
      }

      return (
        <li
          className={cssClass}
          data-key={key}
          key={key}
          onMouseEnter={this.onMouseEnterAutoCompleteItem}
          onMouseDown={this.onMouseDownAutoCompleteItem}
        >
          {displayValue}
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

  return (
      <div className={cssClasses.join(' ')}>{autoCompleteDom}</div>
  );
};

extendText.renderStatusIndicator = function extendTextRenderStatusIndicator() {
  var statusIndicator = null;

  if (this.state.isActive === true && this.props.loadingIndicatorEnabled === true && this.state.isLoading === true) {
    statusIndicator = (
      <div
        className="extend-text__loading-indicator"
        dangerouslySetInnerHTML={{
          __html: loadingSvg
        }}
      ></div>
    );
  }

  return statusIndicator;
};

extendText.renderDropDownIndicator = function extendTextRenderDropDownIndicator() {
  var dropDownIndicator = null;

  if (this.props.dropDownIconFragment) {
    dropDownIndicator = (
      <SvgIcon className="extend-text__drop-down-indicator" fragment={this.props.dropDownIconFragment} />
    );
  }

  return dropDownIndicator;
};

extendText.renderLabel = function extendTextRenderLabel() {
  var label = null;

  if (this.props.label) {
    label = (
      <label className="extend-text__label">
          {this.props.label}
        </label>
      );
  }

  return label;
};

extendText.render = function extendTextRender() {
  var validationIcon = this.validator ? this.validator.renderValidationIcon('extend-text__validation-icon') : null;

  return (
    <div className={this.getCssClasses().join(' ')}>
      {this.renderLabel()}
      <div
        className="extend-text__input-container"
        onClick={this.onClickInputContainer}
      >
        <div className="extend-text__value-container">
          {this.renderTags()}
          <InputAutoSizer
            ref="input"
            type="textarea"
            inputClassName="extend-text__display-input"
            onFocus={this.onFocus}
            onChange={this.onChange}
            value={this.state.displayInputValue}
            onBlur={this.onBlur}
            onKeyDown={this.onKeyDown}
            placeholder={this.getPlaceholder()}
          />
          {this.renderAutoComplete()}
          {this.renderStatusIndicator()}
          {this.renderDropDownIndicator()}
        </div>
        {validationIcon}
      </div>
    </div>
  );
};

module.exports = React.createClass(extendText);
