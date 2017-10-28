import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  getPassThroughProperties,
  composeStyles,
} from 'src/utilities/component';

import styles from 'src/components/notification/NotificationCountdown.module.scss';

export const createGetCssClasses = (instance) => {
  return () => {
    const composedStyles = composeStyles(styles, instance.props.customStyles);
    let cssClasses = [composedStyles.container];

    if (instance.props.className) {
      cssClasses = cssClasses.concat(instance.props.className.split(' '));
    }

    return cssClasses.join(' ');
  };
};

export const createComponentDidMount = (instance) => {
  return () => {
    instance.runCountdownUpdater();
  };
};

export const createRunCountdownUpdate = (instance) => {
  return () => {
    const now = new Date().getTime();

    instance.time = now;
    let timeLeft = (instance.timeLength - (instance.time - instance.start));

    if (timeLeft < 0) {
      timeLeft = 0;
    }

    const percentage = parseFloat((timeLeft / instance.timeLength) * 100).toFixed(2);

    if (instance.refs.countdown) {
      ReactDOM.findDOMNode(instance.refs.countdown).style.width = `${percentage}%`;

      if (percentage > 0) {
        requestAnimationFrame(instance.runCountdownUpdater.bind(instance));
      }
    }
  };
};

class NotificationCountdown extends React.Component {
  static propTypes = {
    length: PropTypes.number.isRequired,
    customStyles: PropTypes.object,
  };

  static defaultProps = {
    length: 0,
    customStyles: null,
  };

  constructor(props) {
    super(props);

    this.time = 0;
    this.timeLength = props.length;
    this.start = new Date().getTime();
  }

  componentDidMount = createComponentDidMount(this);

  getCssClasses = createGetCssClasses(this);
  runCountdownUpdater = createRunCountdownUpdate(this);

  render() {
    return (
      <div
        ref="countdown"
        className={this.getCssClasses()}
      />
    );
  }
}

export default NotificationCountdown;
