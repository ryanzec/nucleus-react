import test from 'ava';

import { getPassThroughProperties } from 'src/utilities/component';

test('getPassThroughProperties remove component specific properties', (tester) => {
  const componentProperties  = {
    className: 'my-custom-class',
    styleType: 'danger',
    'data-id': 123,
    specificToMyComponent: 'some value',
    componentSpecific: 'another value',
  };
  const componentPropTypes = {
    specificToMyComponent: null,
    componentSpecific: null,
  }
  const expectedValue = {
    className: 'my-custom-class',
    styleType: 'danger',
    'data-id': 123,
  };

  tester.deepEqual(getPassThroughProperties(componentProperties, componentPropTypes), expectedValue);
});

test('getPassThroughProperties can keep property from component prop types if explicitly told to', (tester) => {
  const componentProperties  = {
    className: 'my-custom-class',
    styleType: 'danger',
    'data-id': 123,
    specificToMyComponent: 'some value',
    componentSpecific: 'another value',
  };
  const componentPropTypes = {
    specificToMyComponent: null,
    componentSpecific: null,
  }
  const passThroughAnyways = {
    specificToMyComponent: null,
  };
  const expectedValue = {
    className: 'my-custom-class',
    styleType: 'danger',
    'data-id': 123,
    specificToMyComponent: 'some value',
  };

  tester.deepEqual(getPassThroughProperties(componentProperties, componentPropTypes, ...Object.keys(passThroughAnyways)), expectedValue);
});
