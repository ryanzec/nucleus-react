import configuration from 'src/configuration';

export function getMomentObject(date, options) {
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

export function displayHoursAndMinutes(hours, minutes) {
  let display = '';

  if (hours > 0) {
    display += hours;
  } else {
    display += '00';
  }

  display += `:${minutes}`;

  return display;
}

export function formatMinutesToHours(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  let minutesLeft = totalMinutes % 60;

  if (minutesLeft === 0) {
    minutesLeft = '00';
  } else if (minutesLeft < 10) {
    minutesLeft = `0${minutesLeft}`;
  }

  return {
    hours,
    minutes: minutesLeft,
    totalMinutes
  };
}

export function getDurationDisplay(numberOfDays) {
  const duration = {
    days: numberOfDays
  };

  if (duration.days > 90) {
    duration.months = Math.floor(duration.days / 30.5);
    duration.days = Math.round(duration.days % 30.5);
  }

  if (duration.months > 12) {
    duration.years = Math.floor(duration.months / 12);
    duration.months %= 12;
  }

  let display = '';

  if (duration.years) {
    display += `${duration.years} years `;
  }

  if (duration.months) {
    display += `${duration.months} months `;
  }

  if (duration.days) {
    display += `${duration.days} days `;
  }

  return display.trim();
}

export function getMomentObjectFromTimestamp(timestamp, timezone) {
  timezone = timezone || 'UTC';

  //NOTE: we need to double the getMomentObject call in order to first covert to the UTC date object and then to the configured timezone date object
  return getMomentObject(getMomentObject(timestamp, {
    format: 'X',
    timezone
  }).format(configuration.standardDateFormat), {
    format: window.configuration.standardDateFormat
  });
}

export function getYearRange(startYear, endYear) {
  const years = [];
  startYear = parseInt(startYear, 10);
  endYear = parseInt(endYear, 10);

  while (startYear <= endYear) {
    years.push(startYear);

    startYear += 1;
  }

  return years;
}

export function isMonthDayValid(day, month) {
  if (month.length === 1) {
    month = `0${month}`;
  }

  if (day.length === 1) {
    day = `0${day}`;
  }

  return moment(`${month}/${day}/1904`, 'MM/DD/YYYY', true).isValid();
}

export function isInFuture(date, unit) {
  unit = unit || 'day';

  return date.diff(getMomentObject().startOf(unit), unit) > 0;
}
