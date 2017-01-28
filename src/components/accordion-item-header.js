import React from 'react';
import getPassThroughProperties from '../utilities/component/get-pass-through-properties';
import pureRenderShouldComponentUpdate from '../utilities/pure-render-should-component-update';

import SvgIcon from './svg-icon';

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
      <h4
        className={this.getCssClasses().join(' ')}
        {...getPassThroughProperties(this.props, AccordionItemHeader.propTypes)}
      >
        {this.props.children}
        <SvgIcon fragment={this.props.isActive ? 'arrow-up' : 'arrow-down'} />
      </h4>
    );
  }
}

AccordionItemHeader.propTypes = {
  className: React.PropTypes.string,
  isActive: React.PropTypes.bool,
};

AccordionItemHeader.defaultProps = {
  className: null,
  isActive: false,
};

export default AccordionItemHeader;
