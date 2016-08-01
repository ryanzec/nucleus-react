import getMomnentObject from './get-moment-object';

export default function isInFuture(date, unit) {
  unit = unit || 'day';

  return date.diff(getMomnentObject().startOf(unit), unit) > 0;
}
