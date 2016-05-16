import getPassThroughProperies from '../../../../../assets/utilities/component/get-pass-through-properties';

describe('get pass through properties', function() {
  it('should return all properties', function() {
    expect(getPassThroughProperies({
      tagName: 'INPUT',
      value: 'test',
      anotherProperty: 't'
    })).to.deep.equal({
      tagName: 'INPUT',
      value: 'test',
      anotherProperty: 't'
    });
  });

  it('should be able to filter out properties', function() {
    expect(getPassThroughProperies({
      tagName: 'INPUT',
      value: 'test',
      anotherProperty: 't'
    }, 'tagName', 'anotherProperty')).to.deep.equal({
      value: 'test'
    });
  });
});
