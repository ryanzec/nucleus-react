import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class AccordionItem extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['accordion__item'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.isActive) {
      cssClasses.push('is-active');
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, AccordionItem.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

AccordionItem.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};

AccordionItem.defaultProps = {
  className: null,
  isActive: false,
};

export default AccordionItem;
