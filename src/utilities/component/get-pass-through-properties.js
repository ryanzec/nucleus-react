import forEach from 'lodash.foreach';

export default function getPassThroughProperties(componentProperties, ...skipProperties) {
  var passThroughProps = {};

  //NOTE: children should always be passed explicited
  skipProperties.push('children');

  forEach(componentProperties, function(value, key) {
    if (skipProperties.indexOf(key) === -1) {
      passThroughProps[key] = value;
    }
  });

  return passThroughProps;
};
