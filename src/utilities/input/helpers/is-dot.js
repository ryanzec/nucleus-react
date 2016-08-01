export default function isDot(event) {
  return event.shiftKey !== true && (event.which === 110 || event.which === 190);
}
