import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

class NotificationCountdown extends React.Component {
  constructor(props) {
    super(props);

    this.time = 0;
    this.timeLength = props.length;
    this.start = new Date().getTime();
  }

  componentDidMount() {
    this.runCountdownUpdater();
  }

  runCountdownUpdater() {
    const now = new Date().getTime();

    this.time = now;
    let timeLeft = (this.timeLength - (this.time - this.start));

    if (timeLeft < 0) {
      timeLeft = 0;
    }

    const percentage = parseFloat((timeLeft / this.timeLength) * 100).toFixed(2);

    if (this.refs.countdown) {
      ReactDOM.findDOMNode(this.refs.countdown).style.width = `${percentage}%`;

      if (percentage > 0) {
        requestAnimationFrame(this.runCountdownUpdater.bind(this));
      }
    }
  }

  render() {
    return (
      <div
        ref="countdown"
        className="notification__countdown"
      />
    );
  }
}

NotificationCountdown.propTypes = {
  length: PropTypes.number.isRequired
};

NotificationCountdown.defaultProps = {
  length: 0
};

export default NotificationCountdown;
