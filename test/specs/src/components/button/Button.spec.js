import React from 'react';
import test from 'ava';
import reactTestRenderer from 'react-test-renderer';

import Button from '../../../../../src/components/button/Button';

test('default renders correctly', (tester) => {
  const componentTree = reactTestRenderer.create(
    <Button />
  ).toJSON();

  tester.snapshot(componentTree);
});
