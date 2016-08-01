export default function formatMinutesToHours(totalMinutes) {
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
