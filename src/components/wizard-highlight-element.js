import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';
import DomDimensions from '../utilities/dom/dom-dimensions';
import DomEventManager from '../utilities/dom/dom-event-manager';
import getNextId from '../utilities/get-next-id';

import AppendBodyComponent from './append-body-component';
import Button from './button';
import ReactTether from 'react-tether';

class WizardHighlightElement extends AppendBodyComponent {
  constructor(props) {
    super(props);

    this.state = {
      styles: {}
    };

    this.setAppendElementId(getNextId());

    this.domEventManager = new DomEventManager();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  componentDidMount() {
    this.domEventManager.add(window, 'resize', this.setHighlightedStyles.bind(this));
    this.domEventManager.add(window, 'orientationchange', this.setHighlightedStyles.bind(this));

    this.setHighlightedStyles();
    this.updateSelf();
  }

  componentDidUpdate(oldProps) {
    this.updateSelf();
  }

  componentWillUnmount() {
    this.domEventManager.clear();
    this.removeAppendElement();
  }

  getCssClasses() {
    let cssClasses = ['wizard__intro-highlight'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  setHighlightedStyles() {
    const highlightElement = document.querySelector(this.props.highlightedSelector);
    const dimensions = new DomDimensions(highlightElement);

    highlightElement.classList.add('wizard__highlighted-element');

    this.setState({
      styles: {
        top: `${dimensions.dimensions.relativeTop - this.props.highlightPadding}px`,
        left: `${dimensions.dimensions.relativeLeft - this.props.highlightPadding}px`,
        height: dimensions.dimensions.height + (this.props.highlightPadding * 2),
        width: dimensions.dimensions.width + (this.props.highlightPadding * 2)
      }
    });
  }

  updateSelf() {
    let highlightNode = null;

    if (this.props.children) {
      highlightNode = (
        <div>
          {this.props.children}
          <div>
            <Button onClick={this.props.onClickPreviousStep}>{this.props.previousButtonText}</Button>
            <Button onClick={this.props.onClickNextStep}>{this.props.nextButtonText}</Button>
          </div>
        </div>
      );
    }

    this.updateAppendElement(
      <ReactTether
        isActive={true}
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(
          this.props,
          'className',
          'onClickNextStep',
          'onClickPreviousStep',
          'nextButtonText',
          'previousButtonText',
          'highlightedSelector'
        )}
      >
        <div
          style={this.state.styles}
          className={this.getCssClasses().join(' ')}
          {...getPassThroughProperties(
            this.props,
            'className',
            'onClickNextStep',
            'onClickPreviousStep',
            'nextButtonText',
            'previousButtonText',
            'highlightedSelector'
          )}
        />
        {highlightNode}
      </ReactTether>
    );
  }

  render() {
    return null;
  }
}

WizardHighlightElement.displayName = 'WizardHighlightElement';

WizardHighlightElement.propTypes = {
  className: React.PropTypes.string,
  onClickNextStep: React.PropTypes.func,
  onClickPreviousStep: React.PropTypes.func,
  nextButtonText: React.PropTypes.string,
  previousButtonText: React.PropTypes.string,
  highlightedSelector: React.PropTypes.string.isRequired,
  highlightPadding: React.PropTypes.number
};

WizardHighlightElement.defaultProps = {
  className: null,
  onClickNextStep: null,
  onClickPreviousStep: null,
  nextButtonText: 'Next',
  previousButtonText: 'Previous',
  highlightedSelector: null,
  highlightPadding: 0,

  //NOTE: default some ReactTether properties
  attachment: 'top center',
  constraints: [{
    to: 'window',
    attachment: 'together'
  }]
};

export default WizardHighlightElement;
