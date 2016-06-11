import shallowEquals from './shallow-equals';

export default function pureRenderShouldComponentUpdate(currentProps, nextProps, currentState, nextState) {
  return !shallowEquals(currentProps, nextProps) || !shallowEquals(currentState, nextState);
}
