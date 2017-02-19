import React from 'react';
import {
  getPassThroughProperties,
  pureRenderShouldComponentUpdate,
} from '../utilities/component';

class Tab extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return pureRenderShouldComponentUpdate(this.props, nextProps, this.state, nextState);
  }

  getCssClasses() {
    let cssClasses = ['tab'];

    if (this.props.className) {
      cssClasses = cssClasses.concat(this.props.className.split(' '));
    }

    if (this.props.styleType) {
      cssClasses.push(`m-${this.props.styleType}`);
    }

    return cssClasses.join(' ');
  }

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Tab.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

Tab.propTypes = {
  className: React.PropTypes.string,
  styleType: React.PropTypes.oneOf(['block']),
};

Tab.defaultProps = {
  className: null,
  styleType: null,
};

export default Tab;
