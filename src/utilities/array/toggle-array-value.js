import cloneDeep from 'lodash/cloneDeep';

export default function toggleArrayValue(array, value) {
  const newArray = cloneDeep(array);
  const currentIndex = newArray.indexOf(value);

  if (currentIndex === -1) {
    newArray.push(value);
  } else {
    newArray.splice(currentIndex, 1);
  }

  return newArray;
}
