import forEach from 'lodash.foreach';

export default function getPassThroughProperties(componentProperties, propertyDefinations, ...passThrough) {
  const passThroughProps = {};

  // console.log(propertyDefinations);

  //NOTE: children should always be passed explicited
  const skipProperties = Object.keys(propertyDefinations).concat(['children']);
  // console.log(skipProperties);

  console.log(passThrough);

  forEach(componentProperties, (value, key) => {
    if (skipProperties.indexOf(key) === -1 || passThrough.indexOf(key) !== -1) {
      passThroughProps[key] = value;
    }
  });

  // console.log(passThroughProps);

  return passThroughProps;
}
