import configuration from '../../configuration';

export default function isAndroid() {
  return configuration.userAgentDetails.getOS().name.indexOf('Android') !== -1;
}
