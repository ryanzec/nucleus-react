import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {getPassThroughProperties} from 'src/utilities/component';
import { DomEventManager } from 'src/utilities/dom';
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';

import SvgIcon from 'src/components/svg-icon/SvgIcon';
import FormTextbox from 'src/components/form/FormTextbox';
import ExtendTextAutoCompleteOption from './ExtendTextAutoCompleteOption';
import Button from 'src/components/button/Button';
import Badge from 'src/components/badge/Badge';

export const createComponentDidMount = (instance) => {
  return () => {
    instance.domEventManager.add(document, 'mousedown', instance.onClickOutside);
  };
};

export const createComponentDidUpdate = (instance) => {
  return (previousProps) => {
    //TODO: can I use previous state?
    if (
      instance.state.isActive === true
      && (
        instance.state.lastCheckedInputValue === null
        || instance.state.lastCheckedInputValue !== instance.state.inputValue
      )
    ) {
      instance.updateAutoCompleteOptions();
    }

    //need to make sure to update in the input value when the prop value change to keep everything in sync
    const previousValue = previousProps.value && previousProps.value[0] ? previousProps.value[0].value : null;
    const newValue = instance.props.value && instance.props.value[0] ? instance.props.value[0].value : null;

    if (!instance.props.multiple && newValue !== previousValue) {
      instance.setState({
        inputValue: instance.getDisplayValue(instance.props.multiple, instance.props.value)
      });
    }
  };
};

export const createComponentWillUnmount = (instance) => {
  return () => {
    instance.domEventManager.clear();
  };
};

export const createOnClickOutside = (instance) => {
  return (event) => {
    if (instance.state.isActive) {
      let close = true;

      if (
        instance.refs.input
        && (
          ReactDOM.findDOMNode(instance.refs.input).contains(event.target)
          || ReactDOM.findDOMNode(instance.refs.input) === event.target
        )
      ) {
        close = false;
      }

      if (
        close
        && instance.refs.dropDownIndicator
        && (
          ReactDOM.findDOMNode(instance.refs.dropDownIndicator).contains(event.target)
          || ReactDOM.findDOMNode(instance.refs.dropDownIndicator) === event.target
        )
      ) {
        close = false;
      }

      if (
        close
        && instance.refs.autoCompleteContainer
        && (
          ReactDOM.findDOMNode(instance.refs.autoCompleteContainer).contains(event.target)
          || ReactDOM.findDOMNode(instance.refs.autoCompleteContainer) === event.target
        )
      ) {
        close = false;
      }

      if (close) {
        instance.closeAutoComplete();
      }
    }
  };
};

export const createOnFocusInput = (instance) => {
  return () => {
    instance.setState({
      isActive: true,
      activeAutoCompleteOptionIndex: 0
    });
  };
};

export const createOnKeyDown = (instance) => {
  return (event) => {
    switch (event.keyCode) {
      case 27: //escape
        event.preventDefault();
        instance.closeAutoComplete();
        break;

      case 13: //enter
        event.preventDefault();
        instance.selectActiveItem();
        break;

      case 38: //up arrow
        event.preventDefault();
        instance.decreaseActiveAutoCompleteOption();
        break;

      case 40: //down arrow
        event.preventDefault();
        instance.increaseActiveAutoCompleteOption();
        break;

      case 9: //tab
        instance.selectActiveItem();
        break;

      default:
        if (instance.props.allowCreate && instance.props.multiple && instance.props.addTagOnKeyCode === event.keyCode && !event.shiftKey) {
          instance.addTagKeyCodeEnter = true;
          event.preventDefault();
          instance.selectActiveItem();
        }
        break;
    }
  };
};

export const createOnMouseEnterAutoCompleteOption = (instance) => {
  return (event) => {
    instance.setState({
      activeAutoCompleteOptionIndex: parseInt(event.target.getAttribute('data-index'), 10)
    });
  };
};

export const createOnMouseDownAutoCompleteOption = (instance) => {
  return () => {
    instance.selectActiveItem();
  };
};

export const createOnChangeInput = (instance) => {
  return (event) => {
    instance.setState({
      previousInputValue: instance.state.inputValue,
      inputValue: event.target.value
    });
  };
};

export const createOnClickClearAll = (instance) => {
  return () => {
    instance.setValue([], '');
  };
};

export const createOnClickDeleteTag = (instance) => {
  return (event) => {
    const newValue = cloneDeep(instance.props.value);
    newValue.splice(parseInt(event.currentTarget.getAttribute('data-key'), 10), 1);

    instance.setValue(newValue, '');
  };
};

export const createOnClickDropDownIndicator = (instance) => {
  return () => {
    ReactDOM.findDOMNode(instance.refs.input).focus();
  };
};

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['extend-text', `m-${instance.props.autoCompletePosition}`];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.state.isActive) {
      cssClasses.push('is-opened');
    }

    return cssClasses.join(' ');
  };
};

export const createAsyncOptionsCallback = (instance) => {
  return (callbackOptions = {}) => {
    if (callbackOptions.options) {
      let exactMatchIndex = instance.getExactMatchAutoCompleteOptionIndex(instance.state.inputValue, callbackOptions.options);
      let newOptions = instance.filterAutoCompleteOptions(callbackOptions.options);

      if (instance.props.allowCreate && instance.state.inputValue.length > 0) {
        exactMatchIndex = instance.getExactMatchAutoCompleteOptionIndex(instance.state.inputValue, newOptions);

        if (exactMatchIndex === -1) {
          newOptions = [instance.generateObjectValueFromInput()].concat(newOptions);
        }
      }

      instance.setState({
        isLoading: false,
        activeAutoCompleteOptions: newOptions,
        activeAutoCompleteOptionIndex: exactMatchIndex !== -1 ? exactMatchIndex : 0
      }, instance.repositionAutoCompleteContainerToActiveOption);
    }
  };
};

export const createGenerateObjectValueFromInput = (instance) => {
  return () => {
    return {
      display: instance.props.createTemplate.replace('%%value%%', instance.state.inputValue),
      value: instance.state.inputValue,
      isNew: true
    };
  };
};

export const createSelectActiveItem = (instance) => {
  return () => {
    if (instance.state.activeAutoCompleteOptions) {
      instance.updateValue(instance.state.activeAutoCompleteOptions[instance.state.activeAutoCompleteOptionIndex]);
    }
  };
};

export const createUpdateValue = (instance) => {
  return (newValue) => {
    let realNewValue = newValue;

    if (realNewValue.isNew) {
      realNewValue = {
        display: newValue.value,
        value: newValue.value,
        isNew: true
      };
    }

    if (isArray(instance.props.value) && instance.props.multiple) {
      realNewValue = instance.props.value.concat([realNewValue]);
    } else {
      realNewValue = [realNewValue];
    }

    instance.setValue(realNewValue, instance.getDisplayValue(instance.props.multiple, realNewValue));
  };
};

export const createSetValue = (instance) => {
  return (newValue, newInputValue) => {
    if (instance.props.onChange) {
      instance.props.onChange(newValue);
    }

    const newState = {
      previousInputValue: instance.state.inputValue,
      inputValue: newInputValue
    };

    // NOTE: this allow use to update the tags while keeping the auto complete open since the common use case for tagging is adding multiple items
    if (instance.addTagKeyCodeEnter || instance.props.multiple) {
      instance.setState(newState);
      instance.addTagKeyCodeEnter = false;
    } else {
      instance.closeAutoComplete(newValue, newState);
    }
  };
};

export const createUpdateAutoCompleteOptions = (instance) => {
  return () => {
    const newState = {
      lastCheckedInputValue: instance.state.inputValue,
      activeAutoCompleteOptions: [],
    };

    if (instance.props.options.length > 0) {
      newState.activeAutoCompleteOptions = instance.filterAutoCompleteOptions(instance.props.options);

      const exactMatchIndex = instance.getExactMatchAutoCompleteOptionIndex(instance.state.inputValue, newState.activeAutoCompleteOptions);
      newState.activeAutoCompleteOptionIndex = exactMatchIndex !== -1 ? exactMatchIndex : 0;
    } else if (
      instance.state.isActive
      && instance.props.asyncOptions
      && (
        instance.state.lastCheckedInputValue !== instance.state.inputValue
        || instance.state.lastCheckedInputValue === null
      )
      && instance.state.inputValue.length >= instance.props.characterThreshold
    ) {
      newState.isLoading = true;

      instance.props.asyncOptions(instance.state.inputValue, instance.asyncOptionsCallback);
    }

    if (instance.props.allowCreate && newState.activeAutoCompleteOptions && instance.state.inputValue.length > 0) {
      const exactMatchIndex = instance.getExactMatchAutoCompleteOptionIndex(instance.state.inputValue, newState.activeAutoCompleteOptions);

      if (exactMatchIndex === -1) {
        newState.activeAutoCompleteOptions = [instance.generateObjectValueFromInput()].concat(newState.activeAutoCompleteOptions);
      }
    }

    instance.setState(newState, instance.repositionAutoCompleteContainerToActiveOption);
  };
};

export const createIncreaseActiveAutoCompleteOption = (instance) => {
  return () => {
    if (instance.state.activeAutoCompleteOptions && instance.state.activeAutoCompleteOptions.length > 0) {
      let newActiveAutoCompleteOptionIndex = instance.state.activeAutoCompleteOptionIndex;

      if (newActiveAutoCompleteOptionIndex === null) {
        newActiveAutoCompleteOptionIndex = 0;
      } else {
        newActiveAutoCompleteOptionIndex += 1;
      }

      if (instance.state.activeAutoCompleteOptions && newActiveAutoCompleteOptionIndex >= instance.state.activeAutoCompleteOptions.length) {
        newActiveAutoCompleteOptionIndex = 0;
      }

      instance.setState({
        activeAutoCompleteOptionIndex: newActiveAutoCompleteOptionIndex
      }, instance.repositionAutoCompleteContainerToActiveOption);
    }
  };
};

export const createDecreaseActiveAutoCompleteOption = (instance) => {
  return () => {
    if (instance.state.activeAutoCompleteOptions && instance.state.activeAutoCompleteOptions.length > 0) {
      let newActiveAutoCompleteOptionIndex = instance.state.activeAutoCompleteOptionIndex;

      if (newActiveAutoCompleteOptionIndex === null) {
        newActiveAutoCompleteOptionIndex = instance.state.activeAutoCompleteOptions.length - 1;
      } else {
        newActiveAutoCompleteOptionIndex -= 1;
      }

      if (newActiveAutoCompleteOptionIndex < 0) {
        newActiveAutoCompleteOptionIndex = instance.state.activeAutoCompleteOptions.length - 1;
      }

      instance.setState({
        activeAutoCompleteOptionIndex: newActiveAutoCompleteOptionIndex
      }, instance.repositionAutoCompleteContainerToActiveOption);
    }
  };
};

export const createFilterAutoCompleteOptions = (instance) => {
  return (autoCompleteOptions) => {
    let filteredOptions = [];

    if (instance.props.useFiltering && (instance.state.inputValue !== '' || instance.props.multiple)) {
      if (isArray(autoCompleteOptions) && autoCompleteOptions.length > 0) {
        if (instance.props.optionsFilter) {
          filteredOptions = instance.props.optionsFilter(instance.state.inputValue, autoCompleteOptions);
        } else {
          const alreadySelectedValues = [];

          if (instance.props.multiple && isArray(instance.props.value)) {
            instance.props.value.forEach((valueObject) => {
              alreadySelectedValues.push(valueObject.display.toLowerCase());
            });
          }

          filteredOptions = autoCompleteOptions.filter((autoCompleteOption) => (
            (
              autoCompleteOption.display.toLowerCase().indexOf(instance.state.inputValue.toLowerCase()) !== -1
              && alreadySelectedValues.indexOf(autoCompleteOption.display.toLowerCase()) === -1
            )
            || autoCompleteOption.isNew === true
          ));
        }
      }
    } else {
      filteredOptions = cloneDeep(autoCompleteOptions);
    }

    return filteredOptions;
  };
};

export const createRepositionAutoCompleteContainerToActiveOption = (instance) => {
  return () => {
    const activeOptionsSelector = `.extend-text__auto-complete-option:nth-child(${(instance.state.activeAutoCompleteOptionIndex + 1)})`;
    const autoCompleteContainerNode = ReactDOM.findDOMNode(instance.refs.container).querySelector('.extend-text__auto-complete-container');
    const activeOptionNode = ReactDOM.findDOMNode(instance.refs.container).querySelector(activeOptionsSelector);

    if (activeOptionNode) {
      autoCompleteContainerNode.scrollTop = activeOptionNode.offsetTop;
    }
  };
};

export const createCloseAutoComplete = (instance) => {
  return (currentValue = instance.props.value, newState = {}) => {
    Object.assign(newState, {
      isActive: false,
      activeAutoCompleteOptionIndex: null,
      activeAutoCompleteOptions: null,
      lastCheckedInputValue: null,
      inputValue: instance.getDisplayValue(instance.props.multiple, currentValue)
    });

    ReactDOM.findDOMNode(instance.refs.input).blur();

    instance.setState(newState);
  };
};

export const createGetExactMatchAutoCompleteOptionIndex = () => {
  return (inputValue, autoCompleteOptions) => {
    let index = -1;

    if (inputValue !== '' && isArray(autoCompleteOptions) && autoCompleteOptions.length > 0) {
      autoCompleteOptions.forEach((autoCompleteOption, key) => {
        if (index !== -1) {
          return;
        }

        if (autoCompleteOption.display.toLowerCase() === inputValue.toLowerCase()) {
          index = key;
        }
      });
    }

    return index;
  };
};

export const createGetDisplayValue = () => {
  return (allowsMultiple, values) => {
    return !allowsMultiple && isArray(values) && values.length > 0 ? values[0].display : '';
  };
};


let loadingSvg;
/*eslint-disable*/
loadingSvg = '<path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/> <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0 C22.32,8.481,24.301,9.057,26.013,10.047z"></path>';
/*eslint-enable*/

class ExtendText extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    asyncOptions: PropTypes.func,
    value: PropTypes.array,
    onChange: PropTypes.func,
    characterThreshold: PropTypes.number,
    isSearchable: PropTypes.bool,
    disabled: PropTypes.bool,
    useFiltering: PropTypes.bool,
    optionsFilter: PropTypes.func,
    optionRenderer: PropTypes.func,
    tagRenderer: PropTypes.func,
    allowCreate: PropTypes.bool,
    createTemplate: PropTypes.string,
    multiple: PropTypes.bool,
    placeholder: PropTypes.string,
    addTagOnKeyCode: PropTypes.number,
    loadingNode: PropTypes.node,
    typeForSearchingNode: PropTypes.node,
    noOptionsNode: PropTypes.node,
    autoCompletePosition: PropTypes.oneOf(['bottom', 'top']),
    clearable: PropTypes.bool
  };

  static defaultProps = {
    className: null,
    options: [],
    asyncOptions: null,
    value: [],
    onChange: null,
    characterThreshold: 0,
    isSearchable: true,
    disabled: false,
    useFiltering: true,
    optionsFilter: null,
    optionRenderer: null,
    tagRenderer: null,
    allowCreate: false,
    createTemplate: 'Add new item \'%%value%%\'?',
    multiple: false,
    placeholder: '',
    addTagOnKeyCode: null,
    loadingNode: 'Loading options...',
    typeForSearchingNode: 'Start typing for auto complete list',
    noOptionsNode: 'No options found',
    autoCompletePosition: 'bottom',
    clearable: false
  };

  constructor(props) {
    super(props);

    this.domEventManager = new DomEventManager();

    this.state = {
      isActive: false,
      isLoading: false,
      activeAutoCompleteOptionIndex: null,
      activeAutoCompleteOptions: null,
      lastCheckedInputValue: null,
      inputValue: this.getDisplayValue(props.multiple, props.value)
    };
  }

  componentDidMount = createComponentDidMount(this);
  componentDidUpdate = createComponentDidUpdate(this);
  componentWillUnmount = createComponentWillUnmount(this);

  onClickOutside = createOnClickOutside(this);
  onFocusInput = createOnFocusInput(this);
  onKeyDown = createOnKeyDown(this);
  onMouseEnterAutoCompleteOption = createOnMouseEnterAutoCompleteOption(this);
  onMouseDownAutoCompleteOption = createOnMouseDownAutoCompleteOption(this);
  onChangeInput = createOnChangeInput(this);
  onClickClearAll = createOnClickClearAll(this);
  onClickDeleteTag = createOnClickDeleteTag(this);
  onClickDropDownIndicator = createOnClickDropDownIndicator(this);

  getCssClasses = createGetCssClasses(this);
  asyncOptionsCallback = createAsyncOptionsCallback(this);
  generateObjectValueFromInput = createGenerateObjectValueFromInput(this);
  selectActiveItem = createSelectActiveItem(this);
  updateValue = createUpdateValue(this);
  setValue = createSetValue(this);
  updateAutoCompleteOptions = createUpdateAutoCompleteOptions(this);
  increaseActiveAutoCompleteOption = createIncreaseActiveAutoCompleteOption(this);
  decreaseActiveAutoCompleteOption = createDecreaseActiveAutoCompleteOption(this);
  filterAutoCompleteOptions = createFilterAutoCompleteOptions(this);
  repositionAutoCompleteContainerToActiveOption = createRepositionAutoCompleteContainerToActiveOption(this);
  closeAutoComplete = createCloseAutoComplete(this);
  getExactMatchAutoCompleteOptionIndex = createGetExactMatchAutoCompleteOptionIndex();
  getDisplayValue = createGetDisplayValue();

  renderAutoComplete() {
    const processAutoCompleteOptions = (options) => {
      const optionNodes = [];

      options.forEach((option, key) => {
        let displayNode = null;

        if (this.props.optionRenderer) {
          displayNode = this.props.optionRenderer(option);
        } else {
          displayNode = option.display;
        }

        optionNodes.push(
          <ExtendTextAutoCompleteOption
            isActive={key === this.state.activeAutoCompleteOptionIndex}
            key={key}
            data-index={key}
            onMouseEnter={this.onMouseEnterAutoCompleteOption}
            onClick={this.onMouseDownAutoCompleteOption}
          >
            {displayNode}
          </ExtendTextAutoCompleteOption>
        );
      });

      return optionNodes;
    };

    if (!this.state.isActive) {
      return null;
    }

    let children = [];

    if (this.state.isLoading) {
      children.push(
        <div
          key="loading-node"
          className="extend-text__auto-complete-help-text u-muted-text"
        >
          {this.props.loadingNode}
        </div>
      );
    } else if (
      this.state.inputValue.length < this.props.characterThreshold
      && (
        !this.state.activeAutoCompleteOptions
        || this.state.activeAutoCompleteOptions.length === 0
      )
    ) {
      children.push(
        <div
          key="searching-node"
          className="extend-text__auto-complete-help-text u-muted-text"
        >
          {this.props.typeForSearchingNode}
        </div>
      );
    } else {
      const renderableOptions = this.props.useFiltering && this.props.isSearchable && this.props.options.length > 0
        ? this.filterAutoCompleteOptions(this.state.activeAutoCompleteOptions)
        : this.state.activeAutoCompleteOptions;

      if (renderableOptions && renderableOptions.length > 0) {
        children = processAutoCompleteOptions(renderableOptions);
      } else {
        children.push(
          <div
            key="no-options-node"
            className="extend-text__auto-complete-help-text u-muted-text"
          >{
            this.props.noOptionsNode}
          </div>
        );
      }
    }

    return (
      <div
        ref="autoCompleteContainer"
        className="extend-text__auto-complete-container"
      >
        {children}
      </div>
    );
  }

  renderTags() {
    if (!this.props.multiple || !isArray(this.props.value) || this.props.value.length === 0) {
      return null;
    }

    let tagNodes = [];

    this.props.value.forEach((valueObject, key) => {
      const deleteNode = (
        <SvgIcon
          className="extend-text__tag-delete"
          data-key={key}
          fragment="times"
          onClick={this.onClickDeleteTag}
        />
      );
      let tagNode = (
        <span>
          {deleteNode}{valueObject.display}
        </span>
      );

      if (this.props.tagRenderer) {
        tagNode = this.props.tagRenderer(valueObject, deleteNode);
      }

      tagNodes.push(
        <Badge
          key={key}
          className="extend-text__tag"
        >
          {tagNode}
        </Badge>
      );
    });

    let clearAllNode = null;

    if (this.props.clearable && tagNodes.length > 0) {
      clearAllNode = (
        <Button
          styleType="link"
          onClick={this.onClickClearAll}
        >
          Clear all
        </Button>
      );
    }

    return (
      <span>
        {clearAllNode}
        <div className="extend-text__tags-container">
          {tagNodes}
        </div>
      </span>
    );
  }

  renderLoadingIndicator() {
    if (!this.state.isLoading) {
      return null;
    }

    return (
      <svg
        className="extend-text__loading-indicator"
        x="0px"
        y="0px"
        viewBox="0 0 40 40"
        dangerouslySetInnerHTML={{
          __html: loadingSvg
        }}
      />
    );
  }

  render() {
    let gutsNode = null;

    if (this.props.autoCompletePosition === 'top') {
      gutsNode = (
        <span>
          <div className="extend-text__input-container">
            <FormTextbox
              ref="input"
              onFocus={this.onFocusInput}
              onKeyDown={this.onKeyDown}
              value={this.state.inputValue}
              onChange={this.onChangeInput}
              readOnly={!this.props.isSearchable}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
            {this.renderLoadingIndicator()}
            <SvgIcon
              ref="dropDownIndicator"
              onClick={this.onClickDropDownIndicator}
              fragment="caret-down"
              className="extend-text__drop-down-indicator"
            />
            {this.renderAutoComplete()}
          </div>
          {this.renderTags()}
        </span>
      );
    } else {
      gutsNode = (
        <span>
          {this.renderTags()}
          <div className="extend-text__input-container">
            <FormTextbox
              ref="input"
              onFocus={this.onFocusInput}
              onKeyDown={this.onKeyDown}
              value={this.state.inputValue}
              onChange={this.onChangeInput}
              readOnly={!this.props.isSearchable}
              disabled={this.props.disabled}
              placeholder={this.props.placeholder}
            />
            {this.renderLoadingIndicator()}
            <SvgIcon
              ref="dropDownIndicator"
              onClick={this.onClickDropDownIndicator}
              fragment="caret-down"
              className="extend-text__drop-down-indicator"
            />
            {this.renderAutoComplete()}
          </div>
        </span>
      );
    }

    return (
      <div
        ref="container"
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, ExtendText.propTypes)}
      >
        {gutsNode}
      </div>
    );
  }
}

export default ExtendText;
