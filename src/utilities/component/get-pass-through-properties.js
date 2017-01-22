import forEach from 'lodash.foreach';

export default function getPassThroughProperties(componentProperties, propertyDefinations, ...passThrough) {
  const passThroughProps = {};

  //NOTE: children should always be passed explicited
  const skipProperties = Object.keys(propertyDefinations).concat(['children']);

  forEach(componentProperties, (value, key) => {
    if (skipProperties.indexOf(key) === -1 || passThrough.indexOf(key) !== -1) {
      passThroughProps[key] = value;
    }
  });

  return passThroughProps;
}
