import configuration from '../../configuration';

export default function isTouch() {
  return configuration.userAgentDetails.getOS().name === 'iOS'
  || configuration.userAgentDetails.getOS().name === 'Android'
  || configuration.userAgentDetails.getOS().name === 'Windows Mobile'
  || configuration.userAgentDetails.getOS().name === 'Windows Phone';
}
