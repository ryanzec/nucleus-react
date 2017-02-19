import forEach from 'lodash/forEach';
import { shallowEquals } from './core';

export function getPassThroughProperties(componentProperties, propertyDefinations, ...passThrough) {
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

export function pureRenderShouldComponentUpdate(currentProps, nextProps, currentState, nextState) {
  return !shallowEquals(currentProps, nextProps) || !shallowEquals(currentState, nextState);
}
