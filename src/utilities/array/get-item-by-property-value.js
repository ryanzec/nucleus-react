import forEach from 'lodash/forEach';

export default function getItemByPropertyValue(objectsArray, property, value) {
  let returnValue;

  forEach(objectsArray, (objectData) => {
    if (returnValue === undefined && objectData[property] === value) {
      returnValue = this.clone(objectData);
    }
  });

  return returnValue;
}
