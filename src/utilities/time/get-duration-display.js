export default function getDurationDisplay(numberOfDays) {
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
