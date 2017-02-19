export function getKeyByValue(objectData, value) {
  const objectKeys = Object.keys(objectData);

  objectKeys.forEach((prop) => {
    if (objectData.hasOwnProperty(prop)) {
      if (objectData[prop] === value) {
        return prop;
      }
    }
  });
}
