//NOTE: this seems like a pretty safe use to generate a unique id, it would take over 230 days of generating an id at the rate of 100 per second to have the
//NOTE: number exceed the 2.1 billion max value without the browser reloading.
let counter = 0;

export default function getNextId() {
  counter += 1;

  return counter;
}
