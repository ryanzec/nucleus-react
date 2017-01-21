import toggleArrayValue from '../../../../../src/utilities/array/toggle-array-value';

describe('toggle array value', function() {
  it('should add value when not present', function() {
    expect(toggleArrayValue(['test', 'test2', 'test3'], 'test2')).to.deep.equal(['test', 'test3']);
  });

  it('should remove value when present', function() {
    expect(toggleArrayValue(['test', 'test3'], 'test2')).to.deep.equal(['test', 'test3', 'test2']);
  });
});
