import forEach from 'lodash/forEach';
import cloneDeep from 'lodash/cloneDeep';

export function getIndexByPropertyValue(objectsArray, property, value) {
  let matchedKey;

  forEach(objectsArray, (objectData, key) => {
    if (matchedKey === undefined && objectData[property] === value) {
      matchedKey = key;
    }
  });

  return matchedKey;
}

export function getItemByPropertyValue(objectsArray, property, value) {
  let returnValue;

  forEach(objectsArray, (objectData) => {
    if (returnValue === undefined && objectData[property] === value) {
      returnValue = this.clone(objectData);
    }
  });

  return returnValue;
}

export function toggleArrayValue(array, value) {
  const newArray = cloneDeep(array);
  const currentIndex = newArray.indexOf(value);

  if (currentIndex === -1) {
    newArray.push(value);
  } else {
    newArray.splice(currentIndex, 1);
  }

  return newArray;
}
