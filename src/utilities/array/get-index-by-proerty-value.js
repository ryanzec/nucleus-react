import forEach from 'lodash/forEach';

export default function getIndexByPropertyValue(objectsArray, property, value) {
  let matchedKey;

  forEach(objectsArray, (objectData, key) => {
    if (matchedKey === undefined && objectData[property] === value) {
      matchedKey = key;
    }
  });

  return matchedKey;
}
