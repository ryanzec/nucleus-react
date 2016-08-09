import algorithms from './algorithms';

export function testArraySort(numbers, expectedCount) {
  var hasFailed = false;

  if (numbers.length !== expectedCount) {
    console.log('ERROR: expected ' + expectedCount + ' items but only got ' + numbers.length );
    return;
  }

  numbers.forEach(function(value, key) {
    if (hasFailed === true) {
      return;
    }

    //NOTE: we are at the end so it passed
    if (numbers.length === (key + 1)) {
      console.log('SUCCESS: numbers are properly sorted');
    }

    if (value > numbers[key + 1]) {
      console.log('ERROR: ' + value + ' should not be bigger than ' + numbers[key + 1]);
      hasFailed = true;
    }
  });

  return;
}

export function generateRandomArray(itemCount) {
  var randomArray = [];

  while (randomArray.length < itemCount) {
    randomArray.push(Math.ceil(Math.random() * 1000));
  }

  return randomArray;
}

export function runAlgorithm(sortName, itemCount) {
  console.log('---' + sortName + ' sort itemCount items---');

  var sortedArray = generateRandomArray(itemCount);

  console.log(sortedArray);

  sortedArray = algorithms[sortName](sortedArray);

  console.log(sortedArray);

  testArraySort(sortedArray, itemCount);
}
