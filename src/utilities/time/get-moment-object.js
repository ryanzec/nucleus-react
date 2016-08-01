import moment from 'moment-timezone';
import configuration from '../../configuration';

export default function getMomentObject(date, options) {
  options = options || {};

  const timezone = options.timezone || configuration.timezone;
  const format = options.format || window.globals.dateFormats.standardDisplay;

  if (process.env.NODE_ENV !== 'production') {
    if (date && !format) {
      console.warn('If you specific a date when getting a moment object, you should also specific the format to prevent conversion issues');
    }
  }

  if (!date) {
    return moment.tz(timezone);
  }

  return moment.tz(date, format, timezone);
}
