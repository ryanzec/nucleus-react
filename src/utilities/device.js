import configuration from '../configuration';

export function isAndroid() {
  return configuration.userAgentDetails.getOS().name.indexOf('Android') !== -1;
}

export function isTouch() {
  return configuration.userAgentDetails.getOS().name === 'iOS'
  || configuration.userAgentDetails.getOS().name === 'Android'
  || configuration.userAgentDetails.getOS().name === 'Windows Mobile'
  || configuration.userAgentDetails.getOS().name === 'Windows Phone';
}
