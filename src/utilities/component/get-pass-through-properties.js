import forEach from 'lodash.foreach';

export default function getPassThroughProperties(componentProperties, ...skipProperties) {
  const passThroughProps = {};

  //NOTE: children should always be passed explicited
  skipProperties.push('children');

  forEach(componentProperties, (value, key) => {
    if (skipProperties.indexOf(key) === -1) {
      passThroughProps[key] = value;
    }
  });

  return passThroughProps;
}
