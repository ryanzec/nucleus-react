import PropTypes from 'prop-types';
import React from 'react';
import {getPassThroughProperties} from 'src/utilities/component';

export const createGetCssClasses = (instance) => {
  return () => {
    let cssClasses = ['tab'];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    if (instance.props.styleType) {
      cssClasses.push(`m-${instance.props.styleType}`);
    }

    return cssClasses.join(' ');
  };
};

class Tabs extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    styleType: PropTypes.oneOf(['block']),
  };

  static defaultProps = {
    className: null,
    styleType: null,
  };

  getCssClasses = createGetCssClasses(this);

  render() {
    return (
      <div
        className={this.getCssClasses()}
        {...getPassThroughProperties(this.props, Tabs.propTypes)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Tabs;
