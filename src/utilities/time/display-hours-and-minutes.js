export default function displayHoursAndMinutes(hours, minutes) {
  let display = '';

  if (hours > 0) {
    display += hours;
  } else {
    display += '00';
  }

  display += `:${minutes}`;

  return display;
}
