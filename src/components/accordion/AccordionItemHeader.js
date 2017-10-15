import PropTypes from 'prop-types';
import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../../utilities/component';

import SvgIcon from '../svg-icon/SvgIcon';

class AccordionItemHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['accordion__item-header'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <h4
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItemHeader.propTypes)}
      >
        {this.props.children}
        <SvgIcon fragment={this.props.isActive ? 'arrow-up' : 'arrow-down'} />
      </h4>
    );
  }
}

AccordionItemHeader.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
};

AccordionItemHeader.defaultProps = {
  className: null,
  isActive: false,
};

export default AccordionItemHeader;
