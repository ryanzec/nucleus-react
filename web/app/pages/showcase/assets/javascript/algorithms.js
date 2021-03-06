export default {
  swapValues: function(values, index1, index2) {
    var swapValue = values[index1];

    values[index1] = values[index2];
    values[index2] = swapValue;
  },
  bubble: function(numbers) {
    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    var comparisonCount = 0;
    var length = numbers.length;

    for (var x = 0; x < length; x += 1) {
      //NOTE: we start at x since we can be sure anything before that is already sorted
      for (var y = x; y < length; y += 1) {
        //NOTE: this is just for testing purpose to see performance comparied to other algorithms
        comparisonCount += 1;

        //NOTE: if the inner loops value (are are the value after the outer loop) is greater than the outer loops value, we swap the values
        if (numbers[y] < numbers[x]) {
          this.swapValues(numbers, x, y);
        }
      }
    }

    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    console.log(comparisonCount);

    return numbers;
  },
  quick: function(numbers, compareCount) {
    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    var baseCall = compareCount === undefined;
    compareCount = compareCount || {compareCount: 0};

    //NOTE: if the array is empty, nothing to sort (still need to return an empty array to make sure the recursive array concat at the end works properly)
    if (numbers.length === 0) {
      return [];
    }

    var left = [];
    var right = [];
    var pivot = numbers[0];

    for (var x = 1; x < numbers.length; x += 1) {
      //NOTE: this is just for testing purpose to see performance comparied to other algorithms
      compareCount.compareCount += 1;

      //NOTE: we need to split upthe values into 2 half with the smaller values on the left and the large values on the right
      if (numbers[x] < pivot) {
        left.push(numbers[x]);
      } else {
        right.push(numbers[x]);
      }
    }

    //NOTE: we recursively call this function which keeps splitting the value into smaller on the left and large on the right until we end up with just one
    //NOTE: value with each call which then just concat all the array of 1 into 1 large array that is then properly sorted
    var sortedStuff = this.quick(left, compareCount).concat(pivot, this.quick(right, compareCount));

    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    if (baseCall) {
      console.log(compareCount.compareCount);
    }

    return sortedStuff;
  },
  mergeSort: function(left, right, test) {
    var result = [];

    while (left.length && right.length) {
      test.compareCount += 1;

      if (left[0] <= right[0]) {
        result.push(left.shift());
      } else {
        result.push(right.shift());
      }
    }

    while (left.length) {
      result.push(left.shift());
    }

    while (right.length) {
      result.push(right.shift());
    }

    return result;
  },
  merge: function(numbers, compareCount) {
    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    var baseCall = compareCount === undefined;
    compareCount = compareCount || {compareCount: 0};

    if (numbers.length < 2) {
      return numbers;
    }

    var halfIndex = Math.floor(numbers.length / 2);
    var halfA = numbers.slice(0, halfIndex);
    var halfB = numbers.slice(halfIndex);

    //NOTE: this sort works by first reducing the large array into arrays of 1 item (or empty) on the way down the recusrion loop then on the way back up the
    //NOTE: recursion loop is compares left and right values and sort them slowly growing the array. the sorting works here because as the array are slow merged
    //NOTE: back together, they are always already sorted so you can easily just compare them in the order the appear in the array without worrying about them
    //NOTE: getting out of order
    var sortedStuff = this.mergeSort(this.merge(halfA, compareCount), this.merge(halfB, compareCount), compareCount);

    //NOTE: this is just for testing purpose to see performance comparied to other algorithms
    if (baseCall) {
      console.log(compareCount.compareCount);
    }

    return sortedStuff;
  }
};
