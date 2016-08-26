import shallowEquals from '../../../../src/utilities/shallow-equals';

describe('shallow equals', function() {
  it('should return true if values match', function() {
    expect(shallowEquals({test: 'test'}, {test: 'test'})).to.be.true;
  });

  it('should return true if values are the same object', function() {
    let value = {test: 'test'};

    expect(shallowEquals(value, value)).to.be.true;
  });

  it('should return false if the values don\'t match', function() {
    expect(shallowEquals({test: 'test'}, {test: 'tes'})).to.be.false;
  });

  it('should return false if the values have different number of properties', function() {
    expect(shallowEquals({test: 'test'}, {test: 'test', test2: 'test2'})).to.be.false;
  });

  it('should return false if the values are not objects', function() {
    expect(shallowEquals(1, 2)).to.be.false;
  });

  it('should return false if the one of the values are null', function() {
    expect(shallowEquals(1, null)).to.be.false;
    expect(shallowEquals(null, 1)).to.be.false;
  });
});
