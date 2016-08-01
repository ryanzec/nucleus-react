import moment from 'moment-timezone';

export default function isMonthDayValid(day, month) {
  if (month.length === 1) {
    month = `0${month}`;
  }

  if (day.length === 1) {
    day = `0${day}`;
  }

  return moment(`${month}/${day}/1904`, 'MM/DD/YYYY', true).isValid();
}
