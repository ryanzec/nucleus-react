import pureRenderShouldComponentUpdate from '../../../../assets/utilities/pure-render-should-component-update';

describe('pure render should component update', function() {
  it('should return false stuff matches', function() {
    expect(pureRenderShouldComponentUpdate({test: 'test'}, {test: 'test'}, {test2: 'test2'}, {test2: 'test2'})).to.be.false;
  });

  it('should return true is stuff does not match', function() {
    expect(pureRenderShouldComponentUpdate({test: 'test'}, {test: 'tes'}, {test2: 'test2'}, {test2: 'test2'})).to.be.true;
    expect(pureRenderShouldComponentUpdate({test: 'test'}, {test: 'test'}, {test2: 'test2'}, {test2: 'test'})).to.be.true;
    expect(pureRenderShouldComponentUpdate({test: 'test'}, {test: 'tes'}, {test2: 'test2'}, {test2: 'test'})).to.be.true;
  });
});
