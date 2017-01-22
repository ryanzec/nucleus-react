import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

class AccordionItemHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['accordion__item-header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses;
  }

  render() {
    return (
      <div
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, AccordionItemHeader.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

AccordionItemHeader.propTypes = {
  className: React.PropTypes.string
};

AccordionItemHeader.defaultProps = {
  className: null,
};

export default AccordionItemHeader;
