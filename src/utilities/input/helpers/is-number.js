export default function isNumber(event) {
  return (
    event.shiftKey !== true
    && (
      //regular numbers
      (event.which >= 48 && event.which <= 57)
      //numpad numbers
      || (event.which >= 96 && event.which <= 105)
    )
  );
}
