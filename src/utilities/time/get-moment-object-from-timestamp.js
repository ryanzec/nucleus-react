import getMomentObject from './get-moment-object';
import configuration from '../../configuration';

export default function getMomentObjectFromTimestamp(timestamp, timezone) {
  timezone = timezone || 'UTC';

  //NOTE: we need to double the getMomentObject call in order to first covert to the UTC date object and then to the configured timezone date object
  return getMomentObject(getMomentObject(timestamp, {
    format: 'X',
    timezone
  }).format(configuration.standardDateFormat), {
    format: window.configuration.standardDateFormat
  });
}
