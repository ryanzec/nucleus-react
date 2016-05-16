import getInputValueFromEvent from '../../../../../assets/utilities/input/get-input-value-from-event';

describe('get input value from event', function() {
  it('should get value from regular input event', function() {
    expect(getInputValueFromEvent({
      target: {
        tagName: 'INPUT',
        value: 'test'
      }
    })).to.equal('test');
  });

  it('should get value from checkbox input event', function() {
    expect(getInputValueFromEvent({
      target: {
        tagName: 'INPUT',
        type: 'checkbox',
        checked: true
      }
    })).to.be.true;
  });
});
