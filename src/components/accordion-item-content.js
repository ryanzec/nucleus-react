import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class AccordionItemContent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['accordion__item-content'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, AccordionItemContent.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

AccordionItemContent.propTypes = {
  className: React.PropTypes.string
};

AccordionItemContent.defaultProps = {
  className: null,
};

export default AccordionItemContent;
